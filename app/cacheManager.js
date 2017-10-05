
class CacheManager {

    constructor() {
        this._storage = {};
    }

    set(key, value) {
        this._storage[key] = value;
    }

    get(key) {
        return this._storage[key];
    }

    contain(key) {
        let value = this._storage[key];
        return value !== undefined && value !== null;
    }

    reset(key) {
        if (key) {
            this._storage[key] = null;
        }
        else {
            this._storage = {};
        }
    }
}

export default new CacheManager();