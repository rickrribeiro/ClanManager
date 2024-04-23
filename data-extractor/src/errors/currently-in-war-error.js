class CurrentlyInWarError extends Error {
  constructor(retryMinutes) {
    const message = `Clan is currently in War. Rescheduling to run in ${retryMinutes} minutes.`;
    super(message);
    this.code = 'CURRENTLY_IN_WAR_ERROR';
    this.message = message;
    this.retryMinutes = retryMinutes;
  }
}

module.exports = CurrentlyInWarError;