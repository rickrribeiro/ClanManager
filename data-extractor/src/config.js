module.exports = {
  apiKey: process.env.CLASH_API_KEY,
  clanTag: process.env.CLASH_CLAN_TAG || 'G92RCCJ',
  dataServiceType: process.env.DATA_SERVICE_TYPE || 'local',
  baseUrl: process.env.CLASH_API_URL || 'https://api.clashofclans.com/v1',
}
