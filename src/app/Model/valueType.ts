import IEntity from './IEntity';

export default class ValueType implements IEntity {

    constructor(
        public id: string,
        public name: string,
        public validationExpression: string = '') {
    }

    get displayName(): string {
        return `${this.name} ${this.validationExpression}`;
    }
}