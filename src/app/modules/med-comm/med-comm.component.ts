import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-med-comm',
  templateUrl: './med-comm.component.html',
  styleUrls: ['./med-comm.component.scss']
})
export class MedCommComponent implements OnInit {

  constructor() { }

  private comments: string[];

  ngOnInit() {
  }

}
