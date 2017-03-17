
export class PatientObservation {
  id: string;
  value: string;
  date: Date;
   dateFormatted () :string {
    return this.date.toLocaleDateString();
}
}
