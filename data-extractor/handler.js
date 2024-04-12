'use strict';
const ClashApiService = require('./src/services/clash-api-service');
const DataServiceFactory = require('./src/database/data-service-factory');
const DateHelper = require('./src/helpers/date-helper');
require('dotenv').config();

module.exports.main = async (event) => {
  try {

    const clashApiService = new ClashApiService();
    // const currentLeague = await clashApiService.getCurrentWarLeagueGroupWarTags();
    // const leagueAttacks = [];
    // for (const warTag of currentLeague.warTags) {
    //   const warData = await clashApiService.getLeagueWarDetails(warTag);
    //   if (warData.members.length > 0) {
    //     leagueAttacks.push(warData);
    //   }
    // }
    const warData = await clashApiService.getCurrentWar()
    // const endTime = DateHelper.convertClashDateToDateObject(warData.endTime);
    // this logic isnt necessary for normal war, commented to see if its necessary during league
    // const shouldScheduleNextExecution = !DateHelper.isLessThanXMinutesFromNow(endTime, 3);
    // const shouldScheduleNextExecution = warData.state === 'inWar';
    // if (shouldScheduleNextExecution) {
    //   console.log('Scheduling next execution');
    //   const endTime = DateHelper.convertClashDateToDateObject(warData.endTime);
    //   // const nextExecutionTime = DateHelper.subtractMinutesToDate(endTime, 3);
    //   console.log(endTime.toISOString());
    // }
    /// VERIFIFY IF THE DATA ISNT ALREADY IN DATABASE

    // CREATE ANOTHER WORKFLOW TO GET THE WAR LEAGUE DETAILS
    /*
warEnded will stay for around 48 hours or you start a new war search
clanwarleagues/war/wartag fo the war details. with wartag you can request the wardetails after cwl finished

    */
    const dataService = new (DataServiceFactory.getDataService('local'));
    dataService.writeWarData(warData);
    //dataService.writeWarData(leagueAttacks);
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
