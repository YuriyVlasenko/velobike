export default class ContactInformation {
    constructor(
        public id: string,
        public phones: string,
        public workTime: string,
        public slogan: string) {
    }

    get phonesList(): String[] {

        if (!this.phones) {
            return [];
        }
        return this.phones.split(';');
    }
}