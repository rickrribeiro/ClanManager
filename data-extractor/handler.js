'use strict';
const ClashApiService = require('./src/clash-api-service');
const DataServiceFactory = require('./src/data-service-factory');
const DateHelper = require('./src/date-helper');
require('dotenv').config();

module.exports.main = async (event) => {
  try {

    const clashApiService = new ClashApiService();
    const warData = await clashApiService.currentWar()
    const endTime = DateHelper.convertClashDateToDateObject(warData.endTime);
    // this logic isnt necessary for normal war, commented to see if its necessary during league
    // const shouldScheduleNextExecution = !DateHelper.isLessThanXMinutesFromNow(endTime, 3);
    const shouldScheduleNextExecution = warData.state !== 'inWar';
    if (shouldScheduleNextExecution) {
      console.log('Scheduling next execution');
      const nextExecutionTime = DateHelper.subtractMinutesToDate(endTime, 3);
      console.log(nextExecutionTime.toISOString());
    }
    /// VERIFIFY IF THE DATA ISNT ALREADY IN DATABASE
    const dataService = new (DataServiceFactory.getDataService('local'));
    dataService.writeWarData(warData);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'A rua é noiz!'
        }
      ),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
