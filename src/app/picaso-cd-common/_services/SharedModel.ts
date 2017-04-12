export class SharedModel {
    clinician: any;
    patient: any;

    constructor() {
        this.clinician = {
            UPID : "id",
            roles: ["guest"]
        };
        this.patient = {
            pId: "",
            domain: "",
            display: "none"
        };
    }

}

