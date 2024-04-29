class WorkflowExecutor {
  // const steps = [];
  static async execute(workflow) {
    //await workflow.verifyIfWarHasEnded();
    await workflow.getAttacksData();
    await workflow.writeData();
  }
}

module.exports = WorkflowExecutor