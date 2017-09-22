import valueType from './valueType';

export default class Parameter {

    public valueType: valueType;

    constructor(
        public id: string,
        public name: string,
        public valueTypeId: string,
        public description: string = '') {

    }

}