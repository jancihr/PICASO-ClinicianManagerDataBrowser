
const config = {
    "API": {
        "FHIR_CODING_URL": "https://localhost:8080/api/fhir/coding/",
        "FHIR_RESOURCE_URL": "https://localhost:8080/api/picaso/resource/",
        "CLINICIAN_DASHBOARD_URL": "https://localhost:8080/api/",
        "AUTHENTICATION_URL": "https://localhost:8080/api/picaso/authenticate/login",
        "IDENTITY_URL": "https://localhost:8080/api/picaso/authenticate/identify",
        "PATIENTS_URL": "https://localhost:8080/api/picaso/authenticate/patients",
    },
    "common": {
        "defaultHttpReqOptions": null
    },
    "NM": {},
    "CD": {},
    "DRB": {},
    "RM": {}
};

import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";

@Injectable()
export class ConfigurationService {
    private config: any;
    constructor() {
        this.config = config;
        let headers = new Headers ();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        config.common.defaultHttpReqOptions = {
            headers: headers
        };
    }
    get(): any {
        return this.config;
    }
}
