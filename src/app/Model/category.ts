export default class Category {

    public subCategories: Category[];

    constructor(
        public id: String,
        public name: String,
        public parentId: String,
        public order: Number = 0) {
    }

}