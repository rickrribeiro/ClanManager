import data from '../data/mockData.json'
class ClashApiService {

    constructor() {
        this.proxyUrl = 'http://127.0.0.1:5000'
    }

    async getClanWarLog() {
        // const response = await fetch(`${this.proxyUrl}/warLog`, {});
        // const data = await response.json()
        // return data?.members || [];

        // MOCKED DATA FOR TESTS UNTIL COLLECT DATA FROM CLASH API
        data.sort((a, b) => {
            if (a.stars < b.stars) return 1;
            if (a.stars > b.stars) return -1;
            if (a.destruction < b.destruction) return 1;
            if (a.destruction > b.destruction) return -1;

            return 0;
        });

        return data
    }
}


export default ClashApiService;