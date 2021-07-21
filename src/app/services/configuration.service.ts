import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AppConfiguration } from '../models/app-config.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    // Get configuration from gist
    private config = './assets/config.json';

    // Default configuration
    private _configuration: AppConfiguration = {
        project_id: ''
    };
    public get configuration() {
        return this._configuration;
    }
    constructor(private httpClient: HttpClient) { }

    //Load json from the assets and parse its properties
    public load(): Promise<AppConfiguration> {
        return this.httpClient.get<AppConfiguration>(this.config)
            .pipe(
                tap(response => this._configuration = response)
            ).toPromise();
    }
}