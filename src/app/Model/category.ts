export default class Category {

    public subCategories: Category[];

    constructor(
        public id: String,
        public name: String,
        public parentId: String,
        public friendlyName: String,
        public order: Number = 0) {
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

}