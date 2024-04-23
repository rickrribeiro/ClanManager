class NoDataToWriteError extends Error {
  constructor() {
    const message = `Workflow was called, but there is no data to write.`;
    super(message);
    this.code = 'NO_DATA_TO_WRITE_ERROR';
    this.message = message;
    this.retryMinutes = 20;
  }
}

module.exports = NoDataToWriteError;