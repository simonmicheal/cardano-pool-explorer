import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { EMPTY } from "rxjs";

export class DataServiceBase {

    constructor() {
    }

    /**
     * Generic error handling method
     * @param {error} error response 
    */

    handleGenericHttpError(error: HttpErrorResponse) {

        if (error.status === 500) {
            // 500 message
            return EMPTY;
        }

        if (error.status === 400) {
            console.log(`error.message: ${error.error.message} received`);
            throw ("error thrown in service");
        }

        // some other status, return empty data
        console.log(`${error.status} status code rec'd`);
        return EMPTY;
    }
}