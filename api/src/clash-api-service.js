const axios = require('axios');

class ClashApiService {
   
  constructor() {
    this.baseUrl = 'https://api.clashofclans.com/v1'
    this.clanTag = 'G92RCCJ';
  }

  async getMemberList(){
    const response = await axios.get( `https://api.clashofclans.com/v1/clans/%23${this.clanTag}/members`,{
        headers: {
          Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    const members = response.data.items.map((member) => {
        return{
            name: member.name,
            townHallLevel: member.townHallLevel,
        }
    });
    return members;
  }

  async getWarLog(){
    const response = await axios.get( `https://api.clashofclans.com/v1/clans/%23${this.clanTag}/warLog?limit=10`,{
        headers: {
          Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    const wars = response.data.items.map((war) => {
        return{
            name: war.name,
            townHallLevel: war.townHallLevel,
        }
    });
    return wars;
  }
}

module.exports = ClashApiService