import Category from './category';

export default class CategoryTreeNode extends Category {

    constructor({ id, name, parentId, order }) {
        super(id, name, parentId, order);
    }

    get children() {
        return this.subCategories;
    }

}