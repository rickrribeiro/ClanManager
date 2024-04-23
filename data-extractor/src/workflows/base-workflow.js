const { NoDataToWriteError } = require("../errors");

class BaseWorkflow {
  constructor(clasApiService, dataService, currentWar) {
    this.clashApiService = clasApiService;
    this.dataService = dataService;
    this.currentWar = currentWar;
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
    this.dataService.writeWarData(this.warData);
  }
}


module.exports = BaseWorkflow;