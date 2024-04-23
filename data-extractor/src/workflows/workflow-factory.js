const WarTypeEnum = require('../enums/war-type-enum');
const { MaintenanceError, NoWorkflowSelectedError, WTFError, UnexpectedError } = require('../errors');
const { NormalWarWorkflow, LeagueWarWorkflow } = require('./index');
class WorkflowFactory {

  static createWorkflow(clashApiService, dataService) { // , type
    let workflowType; //  = type
    let currentNormalWar;
    let currentLeagueWar;

    if (!workflowType) {
      currentNormalWar = clashApiService.getCurrentWar();
      currentLeagueWar = clashApiService.getCurrentWarLeagueGroupWarTags();

      if (currentNormalWar.reason == 'inMaintenance' && currentLeagueWar.reason == 'inMaintenance') {
        throw new MaintenanceError();
      }
      else if (
        (currentNormalWar.state && currentNormalWar.state != 'notInWar') &&
        (!currentLeagueWar.reason || currentLeagueWar.reason != 'notFound')// temporary. During the next war league verify the correct state
      ) {
        throw new WTFError(currentNormalWar, currentLeagueWar);
      }
      else if (currentLeagueWar.state && currentLeagueWar.reason != 'notFound') {// temporary. During the next war league verify the correct state
        workflowType = WarTypeEnum.LEAGUE;
      }
      else if (currentNormalWar.state && currentNormalWar.state != 'notInWar') {
        workflowType = WarTypeEnum.NORMAL;
      } else {
        throw new UnexpectedError(currentNormalWar, currentLeagueWar);
      }
    }

    if (workflowType === WarTypeEnum.NORMAL) {
      return new NormalWarWorkflow(clashApiService, dataService, currentNormalWar)
    } else if (workflowType === WarTypeEnum.LEAGUE) {
      return new LeagueWarWorkflow(clashApiService, dataService, currentLeagueWar)
    } else {
      throw new NoWorkflowSelectedError();
    }
  }
}

module.exports = WorkflowFactory