'use strict';

/**
 * @ngInject
 * @returns {*}
 * @constructor
 */

function factory($resource) {
  const apiKey = '2738161b2b643233b59b03b310f5190d';
  let url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}`;
  const Weather = $resource(`${url}`, {}, {
    get: {
      method: 'get',
      transformResponse: transformGetResponse
    },
  });

  function transformGetResponse(data) {
    data = angular.fromJson(data);
    return { data };
  }

  return Weather;
}

module.exports = factory;