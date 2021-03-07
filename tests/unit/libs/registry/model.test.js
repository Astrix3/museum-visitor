require('dotenv').config()

const model = require('../../../../libs/registry/model');
const apiconstants = require('../../../config/constants');
const constants = require('../../../../utils/constants');

describe('Testing model/dispact function', () => {

    test('Should successfuly check for LA city URL', () => {
        expect(process.env.MUSEUM_URL).toBeDefined();
    });

    test('Should return successful result', async() => {
        const request = {
            month: apiconstants.ISO_DATE,
            museum: apiconstants.REQUEST.museum
        }
        const response = {
            status: constants.STATUS.SUCCESS,
            data: apiconstants.RESPONSE
        }
        const result = await model(request);
        expect(result).toMatchObject(response);
    });

    test('No data on the Date: Should return error no records found', async() => {
        const request = {
            month: apiconstants.ISO_DATE_WITH_NO_RECORDS,
            museum: apiconstants.REQUEST.museum
        }
        const response = {
            status: constants.STATUS.MISSING,
            error: constants.ERROR.NO_RECORD
        }
        const result = await model(request);
        expect(result).toMatchObject(response);
    });

    test('Museum not present in response: Should return error no records found', async() => {
        const request = {
            month: apiconstants.ISO_DATE,
            museum: ''
        }
        const response = {
            status: constants.STATUS.MISSING,
            error: constants.ERROR.NO_RECORD
        }
        const result = await model(request);
        expect(result).toMatchObject(response);
    });

    test('undefined Date and museum: Should return error no records found', async() => {
        const request = {
            date: undefined,
            museum: undefined
        }
        const response = {
            status: constants.STATUS.MISSING,
            error: constants.ERROR.NO_RECORD
        }
        const result = await model(request);
        expect(result).toMatchObject(response);
    });

    test('undefined museum: Should return error no records found', async() => {
        const request = {
            date: apiconstants.ISO_DATE,
            museum: undefined
        }
        const response = {
            status: constants.STATUS.MISSING,
            error: constants.ERROR.NO_RECORD
        }
        const result = await model(request);
        expect(result).toMatchObject(response);
    });
});