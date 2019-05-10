'use strict';

/**
 * @ngInject
 * @returns {*}
 * @constructor
 */

function factory() {
  const Chart = function() {};

  Chart.prototype.options = function({ type, axisLabelX, axisLabelY, title, callbackFn, tickFormatXFn, tickFormatYFn }) {
    return {
      chart: {
        type: type,
        height: 330,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: data => data.x,
        y: data => data.y,
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: axisLabelX || '',
          tickFormat: (d) => {
            if (typeof tickFormatXFn === 'function') {
              return tickFormatXFn(d);
            }
            return d;
          },
        },
        yAxis: {
          axisLabel: axisLabelY || '',
          tickFormat: function (d) {
            if (typeof tickFormatYFn === 'function') {
              return tickFormatYFn(d);
            }
            return Number.isInteger(d) ? d : d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        },
        callback: function (chart) {
          if (typeof callbackFn === 'function') {
            callbackFn(chart);
          }
        }
      },
      title: {
        enable: true,
        text: title || 'Chart',
      },
    };
  }
  
  return Chart;
}

module.exports = factory;