const axios = require('axios');

class ClashApiService {

  constructor(config) {
    this.baseUrl = config.baseUrl || 'https://api.clashofclans.com/v1';
    this.clanTag = config.clanTag || 'G92RCCJ';
  }

  async getMemberList() {
    const response = await axios.get(`${this.baseUrl}/clans/%23${this.clanTag}/members`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    const members = response.data.items.map((member) => {
      return {
        name: member.name,
        townHallLevel: member.townHallLevel,
      }
    });
    return members;
  }

  async getCurrentWar() {

    const response = await axios.get(`${this.baseUrl}/clans/%23${this.clanTag}/currentwar`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const war = response.data;
    if (war.state === 'inWar' || war.state === 'warEnded') {
      const members = war.clan.members.map((member) => {
        return {
          name: member.name,
          attacks: member.attacks,
        }
      });
      return {
        endTime: war.endTime,
        state: war.state,
        attacksPerMember: war.attacksPerMember,
        members: members
      };
    }
  }

  async getCurrentWarLeagueGroupWarTags() {
    try {

      const response = await axios.get(`${this.baseUrl}/clans/%23${this.clanTag}/currentwar/leaguegroup`, {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      const war = response.data;
      // TODO - verify how to get end time for league war to create an event
      let warTags = [];
      if (war.state === 'ended') {
        war.rounds.forEach((round) => {
          round.warTags.forEach((warTag) => {
            warTags.push(warTag);
          });
        });
        return {
          endTime: war.endTime,
          state: war.state,
          warTags: warTags
        };
      }
    } catch (err) {
      console.log(err); // TODO - TRATAR AQUI DEPOIS OE RROOOOO
      return {
        reason: 'notFound'
      }
    }
  }

  async getLeagueWarDetails(warTag) {

    const response = await axios.get(`${this.baseUrl}/clanwarleagues/wars/${warTag.replace('#', '%23')}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const war = response.data;
    let members = []
    if (war.clan.tag.includes(this.clanTag)) {
      members = war.clan.members;
    } else if (war.opponent.tag.includes(this.clanTag)) {
      members = war.opponent.members;
    }

    const attacks = members.map((member) => {
      return {
        name: member.name,
        attacks: member.attacks,
      }
    });
    return {
      endTime: war.endTime,
      state: war.state,
      attacksPerMember: 1,
      members: attacks
    };

  }
}

module.exports = ClashApiService