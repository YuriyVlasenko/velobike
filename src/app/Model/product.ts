import ProductParameter from './productParameter';
import ProductImage from './productImage';
import IEntity from './IEntity';
import Category from './category';


export default class Product implements IEntity {

    public parameters: ProductParameter[];
    public images: ProductImage[] = [];
    public category: Category = null;
    private course: number = 1;

    constructor(
        public id: string,
        public name: string,
        public categoryId: string,
        public description: string,
        public price: number = 0,
        public order: number = 0,
        public priceUSD: number = 0,
        public newPriceUSD: number = 0,
        public imageUrl: string = '',
        public isActive: boolean = true
    ) {
        this.parameters = [];
    }

    get actualPrice(): number {
        if (this.price) {
            return this.price;
        }
        return Math.round((this.newPriceUSD || this.priceUSD) * (this.course || 1));
    }

    get oldPrice(): number {
        if (this.newPriceUSD) {
            return Math.round(this.priceUSD * (this.course || 1));
        }
        return 0;
    }

    setCourse(course) {
        this.course = course;
    }

    isMatch({ id = null, categoryId = null }): boolean {
        if (id !== null && id !== this.id) {
            return false;
        }

        if (categoryId !== null && categoryId !== this.categoryId) {
            return false;
        }

        return true;
    }

    isContains({ name = null, description = null }): boolean {
        let isContains = true;
        if (name !== null) {
            if (this.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
                return true;
            }
            isContains = false;
        }
        if (description !== null) {
            if (this.description.toLowerCase().indexOf(description.toLowerCase()) !== -1) {
                return true;
            }
            isContains = false;
        }
        return isContains;
    }

    get displayName(): string {
        return this.name;
    }

    get thumbnailPhoto(): string {
        if (this.imageUrl){
            return this.imageUrl;
        }
        return this.images.length > 0 ? this.images[0].url : '/assets/noPhoto.png';
    }
} 