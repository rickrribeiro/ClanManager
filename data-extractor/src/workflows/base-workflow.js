const { NoDataToWriteError } = require("../errors");
const warTypeEnum = require('../enums/war-type-enum');
const DateHelper = require("../helpers/date-helper");

class BaseWorkflow {
  constructor(clasApiService, dataService, currentWar, warType) {
    this.clashApiService = clasApiService;
    this.dataService = dataService;
    this.currentWar = currentWar;
    this.warType = warType;
    this.warData;
  }

  async verifyIfWarHasEnded() {
    // ver na proxima liga se mostra quando termina a ultima guerra
    // gerar exception e passar quantos minutos para finalizar
    // CurrentlyInWarError
    throw new Error('Not implemented');
  }

  async getAttacksData() { // normalwar retorna do parametro, leaguewar chama a função p pegar todos
    throw new Error('Not implemented');
  }

  async writeData() {
    if (!this.warData) {
      throw new NoDataToWriteError();
    }
    let documentId;
    if (this.warType == warTypeEnum.LEAGUE) {
      documentId = `liga${DateHelper.getDateSnakeFormmated()}`;
    } else {
      documentId = `war${this.warData.endTime.split('.')[0]}`; // dps ver outro nome aq
    }
    this.dataService.writeWarData(this.warData, documentId);
  }
}


module.exports = BaseWorkflow;