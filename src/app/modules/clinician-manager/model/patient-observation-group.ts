import {PatientObservation} from "./patient-observation";
export class PatientObservationGroup {
    id: string;
    name: string;
    label: string;
    color: string;
    type: string;
    values: PatientObservation[];
    showLeft: boolean = false;
    showRight: boolean = false;
  minValue: number = null;
  maxValue: number = null;
  midValue: number = null;
}
