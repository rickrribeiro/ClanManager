
class DataServiceFactory {
    static getDataService(dataServiceType) {
        if (dataServiceType === 'dynamo') {
            return require('./dynamo-data-service')
        }
        return require('./local-data-service')
    }

}



module.exports = DataServiceFactory