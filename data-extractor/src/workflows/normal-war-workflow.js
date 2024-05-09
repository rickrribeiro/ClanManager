const BaseWorkflow = require('./base-workflow');
const warTypeEnum = require('../enums/war-type-enum')
class NormalWarWorkflow extends BaseWorkflow {
  constructor(clasApiService, dataService, currentWar) {
    super(clasApiService, dataService, currentWar, warTypeEnum.NORMAL);
  }

  async verifyIfWarHasEnded() {
    // ver na proxima liga se mostra quando termina a ultima guerra
    // gerar exception e passar quantos minutos para finalizar
    // se o retorno da liga for igual a da guerra norma, jogar pro BaseWorkflow
    // CurrentlyInWarError
    throw new Error('Not implemented');
  }

  async getAttacksData() {
    this.warData = this.currentWar;
  }

}

module.exports = NormalWarWorkflow;