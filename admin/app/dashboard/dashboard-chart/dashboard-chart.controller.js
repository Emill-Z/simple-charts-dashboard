'use strict';

/**
 * @ngInject
 * @constructor
 */
function DashboardChartController($timeout, ChartService) {
	const ctrl = this;

	ctrl.settings = {
		type: 'lineChart',
		title: '',
		axisLabelX: '',
		axisLabelY: '',
	}

	ctrl.$onInit = function () {
		ctrl.isShowSelect = typeof ctrl.showSelect === 'undefined' ? true : ctrl.showSelect;
		
		ctrl.optionsSelect = [
			{
				label: 'Line',
				value: 'lineChart',
			},
			{
				label: 'Bar',
				value: 'discreteBarChart',
			},
		]

		ctrl.selected = 'lineChart';

		ctrl.Chart = new ChartService();
		ctrl.settings.title = ctrl.name;
		ctrl.settings.axisLabelX = ctrl.axisLabelX;
		ctrl.settings.axisLabelY = ctrl.axisLabelY;		
		if (ctrl.tickFormatXFn) {
			ctrl.settings.tickFormatXFn = ctrl.tickFormatXFn;		
		}
		if (ctrl.tickFormatYFn) {
			ctrl.settings.tickFormatYFn = ctrl.tickFormatYFn;		
		}

		$timeout(_ => ctrl.setChart());
	};

	ctrl.$onChanges = function(changes) {
		if (changes && Object.keys(changes).length === 1 && changes.chartData) {
			ctrl.setChart();
		}
	}

	ctrl.setChart = function() {
		ctrl.options = ctrl.Chart.options(ctrl.settings);
		ctrl.data = ctrl.chartData;
	}

	ctrl.setTypeChart = function(type) {
		if (ctrl.settings.type === type) return;
		ctrl.settings.type = type;
		ctrl.setChart();
	}

}
module.exports = DashboardChartController;