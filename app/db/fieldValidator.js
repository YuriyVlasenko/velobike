export default class FieldValidator {
    constructor() {
        this.maxStringLength = 200;
        this.maxPrice = 1e6;
    }

    validateStringEmpty(value, fieldName) {
        if (value === undefined || value === null || value === '') {
            throw Error(`${fieldName} is empty`);
        }
    }
    validateStringLength(value, fieldName) {
        if (value && value.length > this.maxStringLength) {
            throw Error(`${fieldName} is too long`);
        }
    }
    validateNumber(value, fieldName, minValue, maxValue) {

        if (typeof value !== 'number') {
            throw Error(`${fieldName} is not a number`);
        }

        if (minValue !== undefined) {
            if (value < minValue) {
                throw Error(`${fieldName} should be greater that ${minValue}`);
            }
        }
        if (maxValue !== undefined) {
            if (value > maxValue) {
                throw Error(`${fieldName} should be lesser that ${maxValue}`);
            }
        }
    }
}