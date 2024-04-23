// MOCKED DATA FOR TESTS UNTIL COLLECT DATA FROM CLASH API
import manualMockData from '../data/manualMockData1.json'
import mockData2 from '../data/leagueMockData2.json'
import mockData3 from '../data/mockData3.json'
import mockData4 from '../data/mockData4.json'
import mockData5 from '../data/mockData5.json'

class ClashApiService { //remember rename to dataservice because its not going to call api directly
    constructor() {
        this.isLoading = false;
        this.membersArray = []
    }

    async getClanWarLog() {

        // MOCKED DATA FOR TESTS UNTIL COLLECT DATA FROM CLASH API
        if (!this.isLoading) {
            this.isLoading = true
            let dataArray = mockData2.concat([mockData3, mockData4, mockData5]);

            const data = {};
            manualMockData.forEach(item => {
                data[item.name] = item;
            });

            for (let i = 0; i < dataArray.length; i++) {
                const mockData = dataArray[i];
                const attacksPerMember = mockData.attacksPerMember;
                mockData.members.forEach(member => {
                    if (!data[member.name]) {
                        data[member.name] = {
                            name: member.name,
                            stars: 0,
                            attacks: 0,
                            missed: 0,
                            destruction: 0,
                            townHallLevel: 0
                        }
                    }
                    let missedAttacks = attacksPerMember;
                    if (member.attacks) {
                        missedAttacks = attacksPerMember - member.attacks.length;
                        data[member.name].attacks += member.attacks.length
                        member.attacks.forEach(attack => {
                            data[member.name].stars += attack.stars;
                            data[member.name].destruction += attack.destructionPercentage;
                        })
                    }
                    data[member.name].missed += missedAttacks;

                });
            }





            Object.keys(data).forEach(key => {
                if (data[key].attacks != 0) {
                    data[key].destruction = data[key].destruction / data[key].attacks;
                    data[key].destruction = data[key].destruction.toFixed(0);
                }

            })

            const membersArray = Object.values(data)
            membersArray.sort((a, b) => {
                if (a.stars < b.stars) return 1;
                if (a.stars > b.stars) return -1;
                if (a.destruction < b.destruction) return 1;
                if (a.destruction > b.destruction) return -1;

                return 0;
            });
            console.log(membersArray)
            this.membersArray = membersArray;
        }
        return this.membersArray
    }
}


export default ClashApiService;