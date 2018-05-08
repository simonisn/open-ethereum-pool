import Ember from 'ember';
import Route from '@ember/routing/route';
import Block from "../models/block";
import config from '../config/environment';

export default Route.extend({
	model: function () {

		var url = config.APP.ApiUrl + 'api/blocks';

		return Ember.$.getJSON(url).then(function (data) {
			if (data.candidates) {
				data.candidates = data.candidates.map(function (b) {
					return Block.create(b);
				});
			}
			if (data.immature) {
				data.immature = data.immature.map(function (b) {
					return Block.create(b);
				});
			}
			if (data.matured) {
				data.matured = data.matured.map(function (b) {
					return Block.create(b);
				});
			}
			return data;
		});
	},

	afterModel(model, transition) {	

		// Configure Block Chart
		model.blockChart = {
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
				scales: {
					xAxes: [{						
						type: 'time',
						distribution: 'linear',
						time: {
							displayFormats: {
								'day': 'MMM DD'
							}
						},
						gridLines: {
							display: false
						},
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],				
					yAxes: [
						// Block Count
						{
							id: 'y-axis-1',
							position: 'left',
							type: 'linear',
							ticks: {
								beginAtZero: true								
							},
							scaleLabel: {
								display: true,
								labelString: 'Block Count'
							}
						}
					]
				}
			},
			data: {			
				// Labels
				labels: [],	
				// Block Count
				datasets: [{
					type: 'line',
					label: 'Block Count',
					borderColor: 'blue',
					yAxesID: 'y-axis-1',
					data: (function() {
						var blocksByDate = {};

						model.matured.forEach(function (block) {
							var blockDate = new Date(block.timestamp * 1000);
							blockDate.setHours(0, 0, 0, 0);
							var timestamp = blockDate.getTime();
							
							if (blocksByDate[timestamp]) {
								blocksByDate[timestamp] = blocksByDate[timestamp] + 1;
							} else {
								blocksByDate[timestamp] = 1;
							}
						});

						var data = [];

						Object.keys(blocksByDate).forEach(function(timestamp) {
							data.push({
								x: new Date(+timestamp),
								y: blocksByDate[timestamp]
							});
						});						

						return data;
					})()
				}]
			},
			plugins: [{
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
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		Ember.run.later(this, this.refresh, config.APP.APIRefreshRate.blocks);
	}
});
