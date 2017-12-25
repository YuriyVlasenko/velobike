import Product from './product';

export default class OrderItem {

    constructor(public product: Product, public count: number) {

    }

    get summ(): number {
        return this.count * this.product.actualPrice;
    }

    get photo(): string {
        return this.product.thumbnailPhoto;
    }

    get displayName(): string {
        return this.product.displayName;
    }
}