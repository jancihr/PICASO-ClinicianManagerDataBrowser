import {PatientData} from "./patient-data";
import {PatientRADAIResult} from "./patient-RADAI-result";
import {PatientMoriskyResult} from "./patient-morisky-result";
import {PatientFFbHResult} from "./patient-ffbh-result";
import {PatientObservationGroup} from "./patient-observation-group";
import {PatientMedication} from "./patient-medication";
import {PatientClinician} from "./patient-clinician";
import {PatientTreatment} from "./patient-treatment";
import {PatientDisease} from "./patient-disease";
import {PatientImage} from "./patient-image";
export class PatientODS {
    info: PatientData;
    radai: PatientRADAIResult[];
    morisky: PatientMoriskyResult[];
    ffbh: PatientFFbHResult[];
    observations: PatientObservationGroup[];
    medications: PatientMedication[];
    clinicians: PatientClinician[];
  treatments: PatientTreatment[];
    diseases: PatientDisease[];
    imaging: PatientImage[];

}
