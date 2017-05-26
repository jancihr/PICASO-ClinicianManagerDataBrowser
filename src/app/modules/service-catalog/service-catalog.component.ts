import {Component, OnInit} from '@angular/core';
import {ServiceCatalogService} from "./service-catalog.service";

@Component({
  selector: 'service-catalog',
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.scss']
})
export class ServiceCatalogComponent implements OnInit {
  services: any[];
  servicesJson: string;

  constructor(private service: ServiceCatalogService) {
  }

  ngOnInit() {
    this.service.getServices().subscribe(res => {
        this.services = res;
        this.servicesJson = this.codeFormat(this.services);
    });

  }

  codeFormat(v) {
    let s = JSON.stringify(v, null, 2) || "";
    return s.trim();
  }
}
