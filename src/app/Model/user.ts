export default class User {

    constructor(
        public id: String,
        public name: String) {
    }

    isMatch({ id = null, name = null, password = null }): boolean {
        if (id !== null && id !== this.id) {
            return false;
        }

        if (name !== null && name.toLowerCase() !== this.name.toLowerCase()) {
            return false;
        }
        return true;
    }

}