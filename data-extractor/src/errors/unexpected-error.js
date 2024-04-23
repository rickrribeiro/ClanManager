class UnexpectedError extends Error {
  constructor(normalWarResponse, leagueWarResponse) {
    const message = `An unexpected error happened. See the logs for more details.`;
    super(message);
    this.code = 'UNEXPECTED_ERROR';
    this.message = message;
    this.retryMinutes = 20;
    this.normalWarResponse = normalWarResponse;
    this.leagueWarResponse = leagueWarResponse;
  }
}

module.exports = UnexpectedError;