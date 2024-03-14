
class DataServiceFactory {
    static getDataService(dataServiceType) {
        if(dataServiceType === 'local') {
            return require('./local-data-service')
        }
        return require('./dynamo-data-service')
    }

}



module.exports = DataServiceFactory