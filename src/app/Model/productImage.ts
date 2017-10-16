export default class ProductImage {

    public isSelected: boolean  = false;

    constructor(
        public id: string,
        public productId: string,
        public url: string,
        public width: number,
        public height: number) {
    }
}