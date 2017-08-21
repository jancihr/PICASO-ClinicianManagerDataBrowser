import {Result} from "./generated-interfaces";

export interface PatientTreatment {
  id: string;
  category: string;
  startDate: Date;
  endDate: Date;
  color: string;
  visitReason: string;
  visitResults: Result[];
}

