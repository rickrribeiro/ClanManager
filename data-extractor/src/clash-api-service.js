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

  async currentWar(){
 
    const response = await axios.get( `https://api.clashofclans.com/v1/clans/%23${this.clanTag}/currentwar`,{
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
   
    const war = response.data;
    if(war.state === 'inWar'){
      const members = war.clan.members.map((member) => {
          return {
              name: member.name,
              attacks: member.attacks,
          }
      });
      return {
        endTime: war.endTime,
        attacksPerMember: war.attacksPerMember,
        members: members
      };
    }
  }
}

module.exports = ClashApiService