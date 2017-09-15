export default class Product {

    constructor(
        public id: string,
        public name: string,
        public categoryId: string,
        public description: string,
        public price: number = 0,
        public order: number = 0) {
    }

}