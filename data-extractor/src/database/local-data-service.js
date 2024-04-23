const fs = require('fs');
const BaseDataService = require("./base-data-service");

class LocalDataService extends BaseDataService {
  async writeWarData(warData) {
    // ver o retorno da liga e definir o nome do arquivo direitinho aq com o endtime da liga
    const filePath = `./src/data/${warData.endTime.split('.')[0]}.json`;
    // const filePath = `./src/data/liga09042024.json`;
    const jsonData = JSON.stringify(warData, null, 2);

    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
    });
  }

}



module.exports = LocalDataService