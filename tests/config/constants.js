const noRecordDate = '2013-01-01T00:00:00.000Z'

const isoDate = '2014-01-01T00:00:00.000Z';

const request = {
    'date': 1388534400000,
    'museum': 'avila_adobe'
};

const response = {
    'result': {
        'month': 'January',
        'year': 2014,
        'museum': 'avila_adobe',
        'visitors': '24778'
    }
}

module.exports.ISO_DATE_WITH_NO_RECORDS = noRecordDate;
module.exports.ISO_DATE = isoDate;
module.exports.REQUEST = request;
module.exports.RESPONSE = response;
