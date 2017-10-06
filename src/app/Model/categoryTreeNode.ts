import Category from './category';

export default class CategoryTreeNode extends Category {

    public shouldLoadProducts: boolean = true;

    constructor({ id, name, parentId, friendlyName, order }) {
        super(id, name, parentId, friendlyName, order);
    }

    get children() {
        return this.subCategories;
    }

}