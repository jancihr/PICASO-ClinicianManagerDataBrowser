import {Component, OnInit} from '@angular/core';
import {CareplanTemplatesService} from "./careplan-templates.service";

@Component({
  selector: 'service-catalog',
  templateUrl: './careplan-templates.component.html',
  styleUrls: ['./careplan-templates.component.scss']
})
export class CareplanTemplatesComponent implements OnInit {
  services: any[];
  servicesJson: string;

  constructor(private service: CareplanTemplatesService) {
  }

  ngOnInit() {
    this.service.getTemlates().subscribe(res => {
        this.services = res;
        this.servicesJson = this.codeFormat(this.services);
    });

  }

  codeFormat(v) {
    let s = JSON.stringify(v, null, 2) || "";
    return s.trim();
  }
}
