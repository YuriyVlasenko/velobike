import IEntity from './IEntity';

export default class Slide implements IEntity {

    constructor(
        public id: string = '',
        public url: string = '',
        public order: number = 0) {
    }

    isMatch({ id = null, url = null }): boolean {
        if (id !== null && id !== this.id) {
            return false;
        }

        if (url !== null && url.toLowerCase() !== this.url.toLowerCase()) {
            return false;
        }
        return true;
    }

    get displayName():string {
        return `${this.order}  (${this.url})`;
    }
} 