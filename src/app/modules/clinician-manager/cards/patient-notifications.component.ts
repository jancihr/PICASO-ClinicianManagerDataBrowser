import {Component, OnInit, OnDestroy} from '@angular/core';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientNotification} from "../model/patient-notification";
import {PatientLoadProgress} from "../model/patient-loadprogress";

@Component({
    selector: 'patient-notifications',
    templateUrl: './patient-notifications.component.html',
    styleUrls: ['./patient-notifications.component.css'],
    providers: [PicasoDataService]

})

export class PatientNotificationsComponent implements OnInit {
    errorMessage: string;
    notifications: PatientNotification[];

    public filterQuery = "";
    public rowsOnPage = 5;
  public sortBy = "date";
  public sortOrder = "desc";
    progress: PatientLoadProgress = {
        percentage: 0,
        loaded: 0,
        total: 0
    };

    constructor(private picasoDataService: PicasoDataService) {
    };

    ngOnInit(): void {
        this.getDiseases();
    }

    getDiseases(): void {

        console.log("progress before load", this.progress.percentage);
        this.picasoDataService.getNotifications(undefined, undefined, this.progress).subscribe(
            notifications => {
                this.notifications = notifications;
                console.log("progress after load", this.progress.percentage);
            },
            error => {
                this.errorMessage = <any>error;
            }
        );
    }

}
