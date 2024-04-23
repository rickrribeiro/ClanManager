class NoWorkflowSelected extends Error {
  constructor() {
    // const message = type ? `Clan is not in ${type} war. This war type was passed in the invoke event, verify if its correct` : `Clan is not in war(normal or league).`;
    const message = `Clan is not in war(normal or league).`;
    super(message);
    this.code = 'NO_WORKFLOW_SELECTED_ERROR';
    this.message = message;
    this.retryMinutes = 23 * 60;
  }
}

module.exports = NoWorkflowSelected;