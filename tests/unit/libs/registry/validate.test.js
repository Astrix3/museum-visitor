
const validate = require('../../../../libs/registry/validate');
const apiconstants = require('../../../config/constants');
const constants = require('../../../../utils/constants');

describe('Validate Input', () => {
    test('Should result in successful validation of input parameters', () => {
        const info = {
            query: apiconstants.REQUEST
        }
        const result = {
            status: constants.STATUS.SUCCESS,
            request: {
                month: apiconstants.ISO_DATE,
                museum: apiconstants.REQUEST.museum
            }
        }
        expect(validate.in(info)).toMatchObject(result);
    });

    test('Should result in unsuccessful validation with exception missing museum', () => {
        const info = {
            query: {
                date: apiconstants.REQUEST.date
            }
        }
        const error = {
            status: constants.STATUS.INVALID,
            error: constants.ERROR.MISSING_DATA(constants.QUERY.MUSEUM)
        }    
        expect(validate.in(info)).toMatchObject(error);
    });

    test('Should result in unsuccessful validation with exception invalid museum', () => {
        const info = {
            query: {
                date: apiconstants.REQUEST.date,
                museum: 1
            }
        }
        const error = {
            status: constants.STATUS.INVALID,
            error: constants.ERROR.INVALID_DATA(constants.QUERY.MUSEUM)
        }    
        expect(validate.in(info)).toMatchObject(error);
    });

    test('Should result in unsuccessful validation with exception missing date', () => {
        const info = {
            query: {}
        }
        const error = {
            status: constants.STATUS.INVALID,
            error: constants.ERROR.MISSING_DATA(constants.QUERY.DATE)
        }    
        expect(validate.in(info)).toMatchObject(error);
    });

    test('Should result in unsuccessful validation with exception invalid date', () => {
        const info = {
            query: {
                date: ''
            }
        }
        const error = {
            status: constants.STATUS.INVALID,
            error: constants.ERROR.INVALID_DATA(constants.QUERY.DATE)
        }    
        expect(validate.in(info)).toMatchObject(error);
    });

    test('Date Format [DD-MM-YYYY]: Should result in unsuccessful validation, with exception invalid date', () => {
        const info = {
            query: {
                date: '07-03-2021'
            }
        }
        const error = {
            status: constants.STATUS.INVALID,
            error: constants.ERROR.INVALID_DATA(constants.QUERY.DATE)
        }    
        expect(validate.in(info)).toMatchObject(error);
    });

    test('If info is undefined should failed with status failure', () => {
        const info = undefined;
        const result = {
            status: constants.STATUS.FAILURE
        };
        expect(validate.in(info)).toMatchObject(result);
    });
});

describe('Validate Output', () => {
    test('Should sent a valid output', () => {
        const info = {
            data: constants.QUERY.MUSEUM
        };
        const result = {
            status: constants.STATUS.SUCCESS,
            data: info.data
        };
        expect(validate.out(info)).toMatchObject(result);
    });

    test('If info is undefined should failed with status failure', () => {
        const info = undefined;
        const result = {
            status: constants.STATUS.FAILURE
        };
        expect(validate.out(info)).toMatchObject(result);
    });
});