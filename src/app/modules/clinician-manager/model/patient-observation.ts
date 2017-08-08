
export class PatientObservation {
  id: string;
  value: number = null;
  date: Date;
  source: string;
  missingReason: string;
  outOfRange: boolean;
  outOfRangeReason: string;


   dateFormatted () :string {
    return this.date.toLocaleDateString();

   }
}
