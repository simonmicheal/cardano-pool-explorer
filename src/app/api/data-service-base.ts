import { HttpErrorResponse } from "@angular/common/http";
import { Injector } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EMPTY } from "rxjs";
import { NgbdModalContent } from "../components/modal.component";

export class DataServiceBase {

    static inject: Injector;
    
    //Add modal service
    constructor(injector: Injector) {
        DataServiceBase.inject = injector;
    }

    /**
     * Generic error handling method
     * @param {error} error response 
    */
    handleGenericHttpError(error: HttpErrorResponse) {

        //Added a static injector, the constructor did not seem to load the service
        let modalService = DataServiceBase.inject.get(NgbModal);

        if (error.status === 500) {
            // 500 message
            return EMPTY;
        }

        if (error.status === 400) {
            console.log(`error.message: ${error.error.message} received`);
            //open new error dialog
           
            throw ("error thrown in service");
        }

        // some other status, return empty data
        modalService.open(NgbdModalContent);
        console.log(`${error.status} status code rec'd`);
        return EMPTY;
    }
}