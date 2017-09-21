import { Observable } from "rxjs/Observable";
import IServerResponse from '../Model/serverResponse';
import { Response } from '@angular/http';

class HttpHelper {
    processResponse(response: Observable<any>) {
        return response
            .map((res: Response) => res.json())     // convert data to JSON
            .map((res: IServerResponse) => {        // check response data
                if (!res.isOk) {
                    return Observable.throw(res.error);
                }
                return res.data;
            })
            .catch((error: any) => {                //  handle error
                return Observable.throw(error.json().error)
            });
    }
}

export default  new HttpHelper();