import {Component, OnInit}            from '@angular/core';
import {CdSharedModelService} from '../_services/cd-shared-model.service'
@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
    cdSharedObject: any;


    constructor(private cdSharedModelService: CdSharedModelService) {
        this.cdSharedObject = this.cdSharedModelService.get();
        console.log(this.cdSharedObject);
        cdSharedModelService.dataChanged$.subscribe(item => this.cdSharedObject = item);
    }

    public disabled: boolean = false;
    public status: {isopen: boolean} = {isopen: false};

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit(): void {
    }
}
