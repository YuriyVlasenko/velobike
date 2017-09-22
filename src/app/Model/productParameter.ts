import Parameter from './parameter';

export default class ProductParameter {

    public parameter: Parameter;

    constructor(
        public id: string,
        public productId: string,
        public parameterId: string,
        public value: string) {
    }
}