import {PatientObservation} from "./patient-observation";
export class PatientObservationGroup {
    id: string;
    name: string;
    label: string;
    color: string;
    values: PatientObservation[];
}