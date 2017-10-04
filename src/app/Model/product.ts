import ProductParameter from './productParameter';
import ProductImage from './productImage';
import IEntity from './IEntity';


export default class Product  implements IEntity {

    public parameters: ProductParameter[]; 
    public images: ProductImage[];

    constructor(
        public id: string,
        public name: string,
        public categoryId: string,
        public description: string,
        public price: number = 0,
        public order: number = 0) {
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

    get displayName():string {
        return this.name;
    }
}