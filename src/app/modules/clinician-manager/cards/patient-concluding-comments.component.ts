import {Component, OnInit} from '@angular/core';
import {PicasoDataService} from "../service/picaso-data.service";
import {PatientLoadProgress} from "../model/patient-loadprogress";
import {ConcludingCommentsResult} from "../model/generated-interfaces";

@Component({
  selector: 'patient-concluding-comments',
  templateUrl: './patient-concluding-comments.component.html',
  styleUrls: ['./patient-concluding-comments.component.css'],
  providers: [PicasoDataService]

})

export class PatientConcludingCommentsComponent implements OnInit {
  errorMessage: string;
  concludingComments: ConcludingCommentsResult[];

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
    this.getConclusingComments();
  }

  getConclusingComments(): void {
    this.picasoDataService.getConcludingComments(undefined, undefined, undefined, this.progress).subscribe(concludingComments => this.concludingComments = concludingComments,
      error => this.errorMessage = <any>error);


  }

}
