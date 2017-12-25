import IEntity from './IEntity';
import OrderItem from './orderItem';

export default class Order implements IEntity {

    public items: OrderItem[];

    constructor(
        public id: string = '',
        public date: string = '',
        public customerName: string = '',
        public customerPhone: string = '',
        public itemIds: string[],
        public itemCounts: number[],
        public summ: string = '',
        public city: string = '',
        public deliveryPoint: string = ''
    ) {
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
        return `${this.id.substr(this.id.length - 6, 6)} ${this.date} ${this.customerName} ${this.customerPhone} (${this.city})`;
    }
} 