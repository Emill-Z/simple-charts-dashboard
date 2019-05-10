'use strict';

const moment = require('moment');

function transformDataForHumidity(data, color) {
  const values = data.map(item => ({ x: item.dt, y: item.main.humidity }))
  return [ { values, color, key: 'sediment in percent', area: true, } ];
}

function transformDataFordataWind(data, color) {
  const values = data.map(item => ({ x: item.dt, y: item.wind.speed }))
  return [ { values, color, key: 'speed', area: true, } ];
}

function transformDataForTemperature(data, colorTemp, colorTempMin, colorTempMax) {
  const values = data.map(item => ({ x: item.dt, y: item.main.temp }))
  const min = data.map(item => ({ x: item.dt, y: item.main.temp_min }))
  const max = data.map(item => ({ x: item.dt, y: item.main.temp_max }))
  
  return [
    {
      values,
      key: 'temperature',
      color: colorTemp,
      area: true,
    },
    {
      values: min,
      key: 'min',
      color: colorTempMin,
      area: true,
    },
    {
      values: max,
      key: 'max',
      color: colorTempMax,
      area: true,
    },
  ];
}

/**
 * @ngInject
 * @constructor
 */
function DashboardController(Weather) {
  const ctrl = this;

  ctrl.weatherApi = Weather;

  ctrl.dataWindColor = 'rgb(246, 255, 0)';
  ctrl.dataHumidityColor = 'rgb(197, 176, 213)';
  ctrl.dataTemperatureColor = 'rgb(70, 255, 1)';
  ctrl.dataTemperatureColorMin = 'rgb(57, 58, 211)';
  ctrl.dataTemperatureColorMax = 'rgb(255, 0, 0)';

  ctrl.isShowHumiditySettings = false;
  ctrl.isShowTemperatureSettings = false;
  ctrl.isShowWindSettings = false;

  ctrl.dataComparison = [];

  ctrl.dateList = [
    { label: 'Today', value: 0 },
    { label: moment(new Date()).add(1,'days').format('D MMMM YYYY'), value: 1 },
    { label: moment(new Date()).add(2,'days').format('D MMMM YYYY'), value: 2 },
    { label: moment(new Date()).add(3,'days').format('D MMMM YYYY'), value: 3 },
    { label: moment(new Date()).add(4,'days').format('D MMMM YYYY'), value: 4 },
  ]

  ctrl.$onInit = function() {
    ctrl.optionsColorPicker = { format: 'rgb' };

    ctrl.dateSelected = ctrl.dateList[0].value;

    ctrl.onChangeChartColor = (dataName, setChartFnName, color) => {
      ctrl[dataName] = color;
      const list = ctrl.getListByDateSelected();
      ctrl[setChartFnName](list);
    }
  
    ctrl.eventApiColorPickerHumidity = {
      onChange(api, color, $event) {
        ctrl.onChangeChartColor('dataHumidityColor', 'setHumidity', color);
      }
    }
    ctrl.eventApiColorPickerTemperature = {
      onChange(api, color, $event) {
        ctrl.onChangeChartColor('dataTemperatureColor', 'setTemperature', color);
      }
    }
    ctrl.eventApiColorPickerTemperatureMin = {
      onChange(api, color, $event) {
        ctrl.onChangeChartColor('dataTemperatureColorMin', 'setTemperature', color);
      }
    }
    ctrl.eventApiColorPickerTemperatureMax = {
      onChange(api, color, $event) {
        ctrl.onChangeChartColor('dataTemperatureColorMax', 'setTemperature', color);
      }
    }
    ctrl.eventApiColorPickerWind = {
      onChange(api, color, $event) {
        ctrl.onChangeChartColor('dataWindColor', 'setWind', color);
      }
    }

    ctrl.getListByDateSelected = () => {
      const trackByDay = moment(new Date()).add(ctrl.dateSelected,'days').format('D');
      return ctrl.localData.list.filter(item => moment.utc(moment.unix(item.dt)).format('D') == trackByDay);
    }
    
    ctrl.showFilter = {
      humidity: false,
      temperature: false,
      wind: false,
    }

    ctrl.weatherApi.get({ id: 509820 }).$promise.then((res) => {
      ctrl.localData = res.data;
      const list = ctrl.getListByDateSelected();
      ctrl.setWind(list);
      ctrl.setHumidity(list);
      ctrl.setTemperature(list);
    });
  }

  ctrl.setComparison = (data, marker) => {
    const keys = data.map(i => i.key);
    const find = ctrl.dataComparison.find((item) => keys.includes(item.key));
    if (!!find) return;
    data.map(i => ctrl.dataComparison.push(i));
    ctrl.showFilter[marker] = true;
  }

  ctrl.clearComparison = (data, marker) => {
    data.map((item) => {
      ctrl.dataComparison = ctrl.dataComparison.filter(i => i.key !== item.key);
    })
    ctrl.showFilter[marker] = false;
  }

  ctrl.setWind = (list) => {
    ctrl.dataWind = transformDataFordataWind(list, ctrl.dataWindColor);
  }

  ctrl.setHumidity = (list) => {
		ctrl.dataHumidity = transformDataForHumidity(list, ctrl.dataHumidityColor);
  }

  ctrl.setTemperature = (list) => {
    ctrl.dataTemperature = transformDataForTemperature(list, ctrl.dataTemperatureColor, ctrl.dataTemperatureColorMin, ctrl.dataTemperatureColorMax);
  }

  ctrl.setDate = () => {
    const list = ctrl.getListByDateSelected();
    ctrl.setWind(list);
    ctrl.setHumidity(list);
    ctrl.setTemperature(list);
  }

  const transformDate = data => moment.utc(moment.unix(data)).format('HH:MM');

  ctrl.tickFormatXFnHumidity = data => transformDate(data);
  ctrl.tickFormatXFnTemperature = data => transformDate(data);
  ctrl.tickFormatXFnWind = data => transformDate(data);
  ctrl.tickFormatXFnComparison = data => transformDate(data);

  ctrl.tickFormatYFnHumidity = data => `${data} %`;
  ctrl.tickFormatYFnTemperature = data => `${data} ℃`;
  ctrl.tickFormatYFnWind = data => `${data} m/s`;
  ctrl.tickFormatYFnComparison = data => data;

}
module.exports = DashboardController;