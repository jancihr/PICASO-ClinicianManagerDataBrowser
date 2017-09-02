import {Result} from "./generated-interfaces";

export interface PatientTreatment {
  id: string;
  category: string;
  categoryId: number;
  startDate: Date;
  endDate: Date;
  color: string;
  visitReason: string;
  visitResults: Result[];
}

