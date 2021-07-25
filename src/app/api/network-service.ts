import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';
import { catchError, map } from "rxjs/operators";
import { INetwork } from "../models/network-data.model";
import { DataServiceBase } from "./data-service-base";

//Graph QL query 
const GET_NETWORK_INFORMATION = gql`
{
    cardano {
        tip {
          number
          slotNo
        }
        currentEpoch {
          number
          startedAt
          blocksCount
        }
      }  
}`


@Injectable({
    providedIn: 'root',
})
export class NetworkService extends DataServiceBase {

    constructor(private apollo: Apollo, private http: HttpClient, private inject: Injector) {
        super(inject);
    }

    /**
    * Get network information
   */
    getNetworkInformation() {
        //request to get network information using Graph QL
        return this.apollo.subscribe<INetwork>({
            query: GET_NETWORK_INFORMATION,
        }).pipe(catchError(this.handleGenericHttpError),
        map((e: any) => {
            return e as INetwork; }));
    }
}