import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { DataServiceBase } from "./data-service-base";
import { catchError, map } from "rxjs/operators";
import { ConfigurationService } from "../services/configuration.service";
import { PoolModel } from "../models/pool-model";

@Injectable({
    providedIn: 'root',
})
export class ExplorerService extends DataServiceBase {

    api: string = 'https://cardano-mainnet.blockfrost.io/api/v0';

    httpOptions: {
        headers: HttpHeaders;
    };

    constructor(private http: HttpClient, private configService: ConfigurationService,private inject: Injector) {
        super(inject);

        //Add the project id to the http headers
        const httpHeader: HttpHeaders = new HttpHeaders().set('project_id', this.configService.configuration.project_id);

        this.httpOptions = {
            headers: httpHeader
        };
    }

    /**
     * Get pools with paging
     * @param {number} page number
    */

    getPools(page: number) {
        //request to get all pools
        return this.http.get(`${this.api}/pools?page=${page}&count=${100}&order=asc`, this.httpOptions)
            .pipe(
                catchError(this.handleGenericHttpError),
                map((e: any) => {
                    return e.map((x) => new PoolModel(x));
                }));
    }

    /**
     * Get pool data
     * @param {PoolModel} PoolModel 
    */

    getPool(pool: PoolModel) {
        //request to get metadata about the pool
        return this.http.get(`${this.api}/pools/${pool.poolId}/metadata`, this.httpOptions)
            .pipe(catchError(this.handleGenericHttpError),
                map((e: any) => {
                    return e;
                }));
    }
}