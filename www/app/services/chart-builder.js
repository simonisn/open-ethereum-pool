import Ember from 'ember';

export default Ember.Service.extend({	
	historicalStatsService: Ember.inject.service('historical-stats'),  

	hashrateCharts: Ember.computed('historicalStatsService.stats', function() {		
		var historicalStats = this.get('historicalStatsService.stats');

		var MEGAHASH = 1000000;

		var workersLongChart,
			workersShortChart,
			totalsChart,
			chartColors = new ChartColors();					

		function ChartColors() {
			var colorIndex = 0;

			this.totals = {
				long: "#286D92",
				short: "#829AB6"
			};

			this.colorPalette = [
				"#5E8DAD",
				"#4A5E8A",
				"#376A97",
				"#0D0F20",
				"#6D7677",
				"#8E804E",
				"#EEE8C8",
				"#A9BFBA"
			];

			this.nextColor = function() {
				var color;
	
				if (colorIndex < chartColors.colorPalette.length) {
					color = chartColors.colorPalette[colorIndex];
					colorIndex += 1;
				} else {
					colorIndex = 0;
					color = chartColors.colorPalette[colorIndex];
				}
	
				return color;
			}
		}

		function HashrateChartDataSet(label, color, data) {
			this.type = 'line';
			this.label = label;
			this.borderColor = color;
			this.yAxesID = 'y-axis-hashrate';
			this.data = data;	
			this.pointRadius = 0; // Don't show points		
		}

		function DataPoint(x, y) {
			this.x = x;
			this.y = y;
		}

		function createHashrateChart(dataSets) {
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
		
		function totalsObjectToDataPointsArray(totalsObject) {
			return Object.keys(totalsObject).map(function(key) {
				return totalsObject[key];
			});
		}

		function createDataSets(historicalStats) {
			var workerLongHashrateDataSets = [],	 // Create Array to hold worker Long Hashrate Data Sets
				workerShortHashrateDataSets = [],	 // Create Array to hold Worker Short Hashrate Data Sets
				totalLongHashrateDataSet,            // Will be created after all Long values have been accumulated
				totalShortHashrateDataSet,           // Will be created after all Short values have been accumulated
				totalLongHashrates = {},  			 // Create Object to hold Total Long Hashrates						
				totalShortHashrates = {};			 // Create Object to hold Total Short Hashrates
			
			
			// Workers is an object, indexed by WorkerId
			Object.keys(historicalStats.workers).forEach(function(workerId) {
				var worker = historicalStats.workers[workerId],
					color,
					longData = [],
					shortData = [];
			
				if (worker.stats) {
					// Stats is an object, indexed by Timestamp
					Object.keys(worker.stats).forEach(function(timeStamp) {
						var hrLong =  +(worker.stats[timeStamp].hrlong) / MEGAHASH,
							hrShort = +(worker.stats[timeStamp].hrshort) / MEGAHASH,
							dateTime = new Date(+timeStamp),
							dataPoint;

						// Add hrLong to Total Long Hashrates (add to existing values with same timestamp)
						if (!totalLongHashrates[timeStamp]) {
							dataPoint = new DataPoint(dateTime, hrLong);
							totalLongHashrates[timeStamp] = dataPoint;							
						} else {
							dataPoint = totalLongHashrates[timeStamp];
							dataPoint.y += hrLong;
						}

						// Add hrShort to Total Short Hashrates (add to existing values with same timestamp)
						if (!totalShortHashrates[timeStamp]) {
							dataPoint = new DataPoint(dateTime, hrShort);
							totalShortHashrates[timeStamp] = dataPoint;
						} else {
							dataPoint = totalShortHashrates[timeStamp];
							dataPoint.y += hrShort;
						} 

						// Add hrLong to Worker Long Data Array
						longData.push( new DataPoint(dateTime, hrLong));							

						// Add hrSHort to Worker Short Data Array
						shortData.push(new DataPoint(dateTime, hrShort));							
					});
				}

				color = chartColors.nextColor();

				// Create Worker Long Hashrate dataset
				workerLongHashrateDataSets.push(new HashrateChartDataSet(workerId, color, longData));

				// Create Worker Short Hashrate dataset
				workerShortHashrateDataSets.push(new HashrateChartDataSet(workerId, color, shortData));
			});
			
			// Convert Total Long Hashrate object to array of values
			totalLongHashrateDataSet = new HashrateChartDataSet('Avg Long Hashrate', chartColors.totals.long, totalsObjectToDataPointsArray(totalLongHashrates));

			// Convert Total Short Hashrate object to array of values
			totalShortHashrateDataSet = new HashrateChartDataSet('Avg Short Hashrate', chartColors.totals.short, totalsObjectToDataPointsArray(totalShortHashrates));

			return {
				workerLongHashrateDataSets: workerLongHashrateDataSets,
				workerShortHashrateDataSets: workerShortHashrateDataSets,
				totalLongHashrateDataSet: totalLongHashrateDataSet,
				totalShortHashrateDataSet: totalShortHashrateDataSet
			};
		}


		




		if (historicalStats && historicalStats.workers) {
			// Create Data Sets
			var dataSets = createDataSets(historicalStats);				

			// Create Charts

			// Only create combined worker charts when more than ONE worker exists, otherwise, only totals chart will be used
			if (Object.keys(historicalStats.workers).length > 1) {
				workersLongChart = createHashrateChart(dataSets.workerLongHashrateDataSets);
				workersShortChart = createHashrateChart(dataSets.workerShortHashrateDataSets);
			}

			// Combine Totals Long ans SHort DataSets into a single chart
			var totalsDataSets = [dataSets.totalLongHashrateDataSet, dataSets.totalShortHashrateDataSet];

			totalsChart = createHashrateChart(totalsDataSets);
		}

		return {
			workersLongChart: workersLongChart,
			workersShortChart: workersShortChart,
			totalsChart: totalsChart
		};
	})
});