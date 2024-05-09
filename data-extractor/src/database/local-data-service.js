const fs = require('fs');
const BaseDataService = require("./base-data-service");

class LocalDataService extends BaseDataService {
  async writeWarData(warData, documentId) {
    const filePath = `./src/data/${documentId}.json`;
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