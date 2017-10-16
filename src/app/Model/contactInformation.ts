import IEntity from './IEntity';

export default class ContactInformation implements IEntity {

    constructor(
        public id: string,
        public phones: string,
        public workTime: string,
        public slogan: string,
        public deliveryPageContent: string,
        public mainPageContent: string,
        public usdCourse: number, 
        public headerColor: string) {
    }

    get phonesList(): String[] {

        if (!this.phones) {
            return [];
        }
        return this.phones.split(';');
    }

    get displayName(): string {
        return `${this.slogan} ${this.workTime}`;
    }
}