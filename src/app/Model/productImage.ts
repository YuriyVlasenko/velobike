export default class ProductImage {

    constructor(
        public id: string,
        public productId: string,
        public url: string,
        public width: number,
        public height: number) {
    }
}