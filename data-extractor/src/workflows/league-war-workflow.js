
class LeagueWarWorkflow extends BaseWorkflow {
  constructor(clasApiService, dataService, currentWar) {
    super(clasApiService, dataService, currentWar);
  }

  async verifyIfWarHasEnded() {
    // ver na proxima liga se mostra quando termina a ultima guerra
    // gerar exception e passar quantos minutos para finalizar
    // se o retorno da liga for igual a da guerra norma, jogar pro BaseWorkflow
    // CurrentlyInWarError
    throw new Error('Not implemented');
  }

  async getAttacksData() {
    // durante a proxima liga tratar retorno com calma p padronizar com o normal. 
    // Rodar o foreach p cada membro, contar quantos ataques e definir a mesma estrutura de array de attacks
    const leagueAttacks = [];
    for (const warTag of this.currentWar.warTags) {
      const warData = await this.clashApiService.getLeagueWarDetails(warTag);
      if (warData.members.length > 0) {
        leagueAttacks.push(warData);
      }
    }
    this.warData = leagueAttacks;
  }

}


module.exports = LeagueWarWorkflow;