import IEntity from './IEntity';

export default class Category implements IEntity {

    public subCategories: Category[];

    constructor( 
        public id: string,
        public name: string,
        public parentId: string,
        public friendlyName: string,
        public order: number = 0) {
    }

    isMatch({ id = null, name = null, friendlyName = null }): boolean {
        if (id !== null && id !== this.id) {
            return false;
        }

        if (name !== null && name.toLowerCase() !== this.name.toLowerCase()) {
            return false;
        }

        if (friendlyName !== null && friendlyName.toLowerCase() !== this.friendlyName.toLowerCase()) {
            return false;
        }

        return true;
    }

    get displayName():string {
        return this.name;
    }

}