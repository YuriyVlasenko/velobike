import { Observable } from "rxjs/Observable";
import { AsyncSubject } from "rxjs";

const getDataSubject = (dataFn: any) => {
    const subject = new AsyncSubject();
    dataFn(false).subscribe((data) => {
        subject.next(data);
        subject.complete();
    })
    return subject;
}

export default class SmartCacheService {

    private cache = {};
    constructor() { }

    set(key: string, dataFn: (fromCache: boolean) => Observable<any[]>, storeTime: number = 10 * 1000) {

        if (this.cache[key]) {
            clearInterval(this.cache[key].interval);
            console.log('load data for ' + key);
        }

        this.cache[key] = {
            data: getDataSubject(dataFn),
            interval: setInterval(() => {
                console.log('reload data for ' + key);
                this.cache[key].data = getDataSubject(dataFn)
            }, storeTime)
        }
    }

    get(key: string): Observable<any[]> {
        if (this.cache[key]) {
            return this.cache[key].data;
        }
        return null;
    }
}