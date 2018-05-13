import Ember from 'ember';

export default Ember.Service.extend({		
	
	constants: {
		MEGAHASH: 1000000,
		GWEI: 1000000000
	},

	common: {
		// ChartColors constructor
		ChartColors: function () {
			var colorIndex = 0,
				colorPalette =  [
				"#286D92",
				"#829AB6",
				"#5E8DAD",
				"#4A5E8A",
				"#376A97",
				"#0D0F20",
				"#6D7677",
				"#8E804E",
				"#EEE8C8",
				"#A9BFBA"
			];

			this.colorPalette = colorPalette;

			this.nextColor = function() {
				var color;
	
				if (colorIndex < colorPalette.length) {
					color = colorPalette[colorIndex];
					colorIndex += 1;
				} else {
					colorIndex = 0;
					color = colorPalette[colorIndex];
				}
	
				return color;
			}
		},			
		
		// TimeDataPoint constructor
		TimeDataPoint: function (timeStamp, value) {
			this.x = +timeStamp;
			this.y = value;
		}				
	},	
	
	accountHashrateChart(historicalStats) {			
		var ChartColors = this.common.ChartColors,
			TimeDataPoint = this.common.TimeDataPoint,
			chartColors = new ChartColors(),
			constants = this.constants;

		function HashrateChartDataSet(label, color, data) {
			this.type = 'line';
			this.label = label;
			this.borderColor = color;
			this.borderWidth = 2;
			this.yAxesID = 'y-axis-hashrate';
			this.data = data;	
			this.pointRadius = 0; // Don't show points		
		}		

		function createChart(dataSets) {
			// Build Chart Data Structure
			var chart = {
				type: 'line',			
				options: {
					animation: false,
					layout: {
						padding: {
							left: 0,
							right: 0,
							top: 15,
							bottom: 15
						}
					},
					lengend: {
						position: 'bottom'
					},		
					maintainAspectRatio: false,	
					scales: {
						xAxes: [{						
							type: 'time',
							distribution: 'linear',
							time: {
								unit: 'day',
								displayFormats: {
									'day': 'MMM DD'
								}
							},
							gridLines: {
								display: false
							},
							scaleLabel: {
								display: true,
								labelString: 'Date/Time'
							}
						}],				
						yAxes: [
							// Hashrate
							{
								id: 'y-axis-hashrate',
								position: 'left',
								type: 'linear',
								ticks: {
									beginAtZero: true								
								},
								scaleLabel: {
									display: true,
									labelString: 'Hashrate (MH/s)'
								}
							}
						]
					}
				},
				data: {
					// Labels - Autoset by plugin
					labels: [],	
					datasets: dataSets
				},
				plugins: [{
					// Auto-Build the labels, based on the timestamps in the data sets
					beforeInit: function(chart) {
						var time = chart.options.scales.xAxes[0].time, // 'time' object reference
							// difference (in days) between min and max date
							timeDiff = moment(time.max).diff(moment(time.min), 'd');
						// populate 'labels' array
						// (create a date string for each date between min and max, inclusive)
						for (var i = 0; i <= timeDiff; i++) {
							var _label = moment(time.min).add(i, 'd').format('YYYY-MM-DD HH:mm:ss');
							chart.data.labels.push(_label);
						}
					}
				}]
			};

			return chart;
		}
		
		function hashTableToArray(hashTable) {
			return Object.keys(hashTable).map(function(key) {
				return hashTable[key];
			});
		}

		function createDataSets(historicalStats) {
			var dataSets = [],			 // Create Array to hold worker Hashrate Data Sets				
				totalHashTable = {};  	 // Create Object to hold Total Hashrates
							
			if (historicalStats && historicalStats.workers) {
				// Workers is an object, indexed by WorkerId
				Object.keys(historicalStats.workers).forEach(function(workerId) {
					var worker = historicalStats.workers[workerId],				
						hashrateDataPoints = [];
				
					if (worker.stats) {
						// Stats is an object, indexed by Timestamp
						Object.keys(worker.stats).forEach(function(timeStamp) {
							if(worker.stats[timeStamp].hashrate) {
								var hashrate = +(worker.stats[timeStamp].hashrate) / constants.MEGAHASH,
									dataPoint = new TimeDataPoint(timeStamp, hashrate);

								// Add hashrate to Worker datapoint array
								hashrateDataPoints.push(dataPoint);

								// Add/Update hashrate for Total
								if (totalHashTable[timeStamp]) {
									totalHashTable[timeStamp].y += hashrate;
								} else {
									totalHashTable[timeStamp] = new TimeDataPoint(timeStamp, hashrate);
								}
							}
						});
					}

					// Create Worker Hashrate dataset
					dataSets.push(new HashrateChartDataSet(workerId, chartColors.nextColor(), hashrateDataPoints));
				});
							
				// Create Total Hashrate dataset
				dataSets = [new HashrateChartDataSet('Total Hashrate', chartColors.nextColor(), hashTableToArray(totalHashTable))].concat(dataSets);
			}

			return dataSets;
		}





		var dataSets = createDataSets(historicalStats);		

		return createChart(dataSets);
	}
});