export class SharedModel {
    clinician: any;
    patient: any;

    constructor() {
        this.clinician = {
            pid: "id",
            domain: "UTV",
            roles: ["guest"],
            display: "guest"
        };
        this.patient = {
            pId: "",
            domain: "",
            display: "none"
        };
    }

}

