class WTFError extends Error {
  constructor(normalWarResponse, leagueWarResponse) {
    const message = `This name is just a joke, but wtffff this error would never happen!`;
    super(message);
    this.code = 'WTF_ERROR';
    this.message = message;
    this.retryMinutes = 20;
    this.normalWarResponse = normalWarResponse;
    this.leagueWarResponse = leagueWarResponse;
  }
}

module.exports = WTFError;