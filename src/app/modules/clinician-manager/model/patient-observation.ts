
export class PatientObservation {
  id: string;
  value: string;
  date: Date;
  source: string;
   dateFormatted () :string {
    return this.date.toLocaleDateString();
}
}
