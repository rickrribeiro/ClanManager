const dataServiceTypeEnum = require('../enums/data-service-type-enum')

class DataServiceFactory {
    static getDataService(dataServiceType) {
        if (dataServiceType === dataServiceTypeEnum.DYNAMO_DB) {
            return require('./dynamo-data-service')
        }
        return require('./local-data-service')
    }

}



module.exports = DataServiceFactory