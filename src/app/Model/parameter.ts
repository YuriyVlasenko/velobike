import IEntity from './IEntity';
import valueType from './valueType';

export default class Parameter implements IEntity {

    public valueType: valueType;

    constructor(
        public id: string,
        public name: string,
        public valueTypeId: string,
        public description: string = '') {

    }

    get displayName(): string {
        return this.name;
    }
}