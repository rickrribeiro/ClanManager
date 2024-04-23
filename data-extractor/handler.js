'use strict';
require('dotenv').config();
const ClashApiService = require('./src/services/clash-api-service');
const DataServiceFactory = require('./src/database/data-service-factory');
const DateHelper = require('./src/helpers/date-helper');
const { WorkflowFactory, WorkflowExecutor } = require('./src/workflows');
const config = require('./src/config');

// lembrar de tratar quando ele jogar um cron p tempo x e o automatico a cada 23hrs pegar tb o resultado, p evitar resultados duplicados
// warEnded will stay for around 48 hours or you start a new war search
module.exports.main = async (event) => {
  try {
    // rodar a request de pegar os membros do clan e atualizar no banco a lista de membros
    // fazer isso para mostrar também os membros que não participaram de nenhuma guerra e não mostrar os membros que sairam do clan
    //!!!!!!!! usar a tag do player como chave pois o player pode mudar de nick !!!!!!!
    const clashApiService = new ClashApiService(config);
    const dataService = new (DataServiceFactory.getDataService(config.dataServiceType));
    const workflow = WorkflowFactory.createWorkflow(clashApiService, dataService); // , event.type
    WorkflowExecutor.execute(workflow);
    // const endTime = DateHelper.convertClashDateToDateObject(warData.endTime);
    // const shouldScheduleNextExecution = !DateHelper.isLessThanXMinutesFromNow(endTime, 3);
    // const shouldScheduleNextExecution = warData.state === 'inWar';
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
    // programar nova exec
    throw err;
  }
};
