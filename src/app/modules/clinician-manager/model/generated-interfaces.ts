export interface AnyCallInputParameters {
  patientId: string;
  startDate: string;
  endDate: string;
}

export interface InfoResult {
  id: string;
  name: string;
  address: string;
  bloodType: string;
  dob: Date;
  height: string;
  gender: string;
  insurer: string;
  insurerId: string;
  occupancy: string;
  livesAlone: string;
}

export interface Value {
  id: string;
  value: number;
  date: string;
  source: string;
  outOfRange: boolean;
  calculatedMax: number;
  calculatedMin: number;
}

export interface ObservationResult {
  id: string;
  name: string;
  unit: string;
  color: string;
  type: string;
  minValue?: number;
  midValue?: number;
  maxValue?: number;
  source: string;
  helpText: string;
  values: Value[];
  showLeft: boolean;
  showRight: boolean;
  index: number;

}

export interface MedicationPrescriptionsResult {
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
}

export interface MedicationIntakesResult {
  id: string;
  name: string;
  date: Date;
  dosage: string;
  color: string;
  disease: string;
  prescribedBy: string;
}

export interface FollowUpsResult {
  id: string;
  name: string;
  role: string;
  createdDate: Date,
  patientUpdatedDate: Date,
  followUpDate: Date,
  note: string;
}

export interface ConcludingCommentsResult {
  id: string;
  authorId: string;
  addresseeId: string;
  addresseeRoleId: string;
  authorName: string;
  authorRole: string;
  addresseeRole: string;
  addresseeName: string;
  date: Date;
  comment: string;
}

export interface CliniciansResult {
  id: string;
  name: string;
  institution: string;
  speciality: string;
  startDate: Date;
  endDate: Date;
}

export interface CareProfessionalVisit {
  id: string;
  date: Date;
  careProfessional: string;
  color: string;
  result: string;
}

export interface Result {
  type: string;
  result: string;
}

export interface LabTestResult {
  id: string;
  source: string;
  date: Date;
  results: Result[];
  color: string;
}

export interface Result2 {
  type: string;
  result: string;
}

export interface ImagingResult {
  id: string;
  source: string;
  date: Date;
  results: Result2[];
  color: string;
}

export interface Result3 {
  type: string;
  result: string;
}

export interface PsychologicalNeurologicalTestsPerformed {
  id: string;
  source: string;
  date: Date;
  results: Result3[];
  color: string;
}

export interface Result4 {
  type: string;
  result: string;
}

export interface FunctionalDiagnosticsResult {
  id: string;
  source: string;
  date: Date;
  color: string;
  results: Result4[];
}

export interface Result5 {
  type: string;
  result: string;
}

export interface PatientReportedOutcomesResult {
  id: string;
  source: string;
  date: Date;
  color: string;
  results: Result5[];
}

export interface Result6 {
  type: string;
  result: string;
}

export interface QuestionaryFilled {
  id: string;
  source: string;
  date: Date;
  color: string;
  results: Result6[];
}

export interface DiseasesResult {
  id: string;
  name: string;
  dateOfOnset: Date;
  dateOfOffset?: any;
  sideOfOnset: string;
  clinicalPhenotype: string;
  severity: string;
}

export interface ODSResult {
  anyCallInputParameters: AnyCallInputParameters;
  infoResult: InfoResult;
  observationResult: ObservationResult[];
  medicationPrescriptionsResult: MedicationPrescriptionsResult[];
  medicationIntakesResult: MedicationIntakesResult[];
  followUpsResult: FollowUpsResult[];
  concludingCommentsResult: ConcludingCommentsResult[];
  cliniciansResult: CliniciansResult[];
  careProfessionalVisit: CareProfessionalVisit[];
  labTestResult: LabTestResult[];
  imagingResult: ImagingResult[];
  psychologicalNeurologicalTestsPerformed: PsychologicalNeurologicalTestsPerformed[];
  functionalDiagnosticsResult: FunctionalDiagnosticsResult[];
  patientReportedOutcomesResult: PatientReportedOutcomesResult[];
  questionaryFilled: QuestionaryFilled[];
  diseasesResult: DiseasesResult[];
}


