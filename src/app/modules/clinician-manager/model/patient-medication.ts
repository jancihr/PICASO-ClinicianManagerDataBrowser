export interface PatientMedication {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  dosage: string;
  frequency: string;
  stopReason: string;
  color: string;
  disease: string;
  prescribedBy: string;
  type: string;
  typeId: number;
}
