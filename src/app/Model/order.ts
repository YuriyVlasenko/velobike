import IEntity from './IEntity';

import Product from './product';

class OrderItem {

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

export default class Order implements IEntity {

    public items: OrderItem[];

    constructor(
        public id: string = '',
        public date: string = '',
        public customerName: string = '',
        public customerPhone: string = '',
        public itemIds: string[],
        public itemCounts: number[],
        public summ: string = '', ) {
        this.items = [];
    }

    isMatch({ id = null }): boolean {
        if (id !== null && id !== this.id) {
            return false;
        }

        return true;
    }

    get ItemsCount(): number {
        return this.itemIds.length;
    }

    get displayName(): string {
        return `${this.date} ${this.customerName} ${this.customerPhone}`;
    }
} 