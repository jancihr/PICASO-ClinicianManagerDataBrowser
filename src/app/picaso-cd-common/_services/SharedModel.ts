export class SharedModel {
    clinician: any;
    patient: any;

    constructor() {
        this.clinician = {
            UPID : "id",
            roles: ["guest"]
        };
        this.patient = {
            UPID: "",
            domain: "",
            display: "none"
        };
    }

}

