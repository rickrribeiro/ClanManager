'use strict';
const ClashApiService = require('./src/clash-api-service');
const DataServiceFactory = require('./src/data-service-factory');
require('dotenv').config();

module.exports.main = async (event) => {
  const clashApiService = new ClashApiService();
  const warData = await clashApiService.currentWar()
  const dataService = new (DataServiceFactory.getDataService('local'));
  dataService.writeWarData(warData);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
