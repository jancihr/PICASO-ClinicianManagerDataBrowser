"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ng2_vis_1 = require('ng2-vis/ng2-vis');
var picaso_data_service_1 = require("../service/picaso-data.service");
var PatientCheckHistoryComponent = (function () {
    function PatientCheckHistoryComponent(visTimelineService, picasoDataService) {
        this.visTimelineService = visTimelineService;
        this.picasoDataService = picasoDataService;
        this.visTimelineChecks = 'visTimelineGraph';
    }
    PatientCheckHistoryComponent.prototype.timelineInitialized = function () {
        // console.log('timeline initialized');
        // now we can use the service to register on events
        this.visTimelineService.on(this.visTimelineChecks, 'click');
    };
    PatientCheckHistoryComponent.prototype.ngOnInit = function () {
        //this.selectedItem = '';
        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setFullYear(this.endDate.getFullYear() - 1);
        this.getChecks();
        this.visTimelineItemsChecks = new ng2_vis_1.VisTimelineItems([]);
        this.visTimelineChecksOptions = {
            selectable: true,
            showCurrentTime: true,
            //zoomMax: 61556926000, //year
            zoomMin: 86400000,
            clickToUse: true
        };
    };
    PatientCheckHistoryComponent.prototype.setChecks = function (checks) {
        this.checks = checks;
        this.visTimelineItemsChecks = new ng2_vis_1.VisTimelineItems([]);
        this.listOfItems = [];
        for (var _i = 0, checks_1 = checks; _i < checks_1.length; _i++) {
            var item = checks_1[_i];
            if (item.endDate === undefined)
                this.visTimelineItemsChecks.add({
                    id: item.id,
                    content: "<div>\n    <div class=\"w3-large\">" + item.clinician + "</div>\n    <div class=\"w3-small\">" + item.visitReason + " </div>\n    \n</div>",
                    start: item.startDate,
                    type: 'point'
                });
            else
                this.visTimelineItemsChecks.add({
                    id: item.id,
                    content: "<div>\n    <div class=\"w3-large\">" + item.clinician + "</div>\n    <div class=\"w3-small\">" + item.visitReason + " </div>\n    \n</div>",
                    start: item.startDate,
                    end: item.endDate,
                });
            this.listOfItems.push(item.id);
        }
        var today = new Date();
        var yearsAgo = new Date();
        yearsAgo.setFullYear(today.getFullYear() - 2);
        this.visTimelineChecksOptions.start = yearsAgo;
        this.visTimelineChecksOptions.end = today;
    };
    PatientCheckHistoryComponent.prototype.getChecks = function () {
        var _this = this;
        this.picasoDataService.getCheckHistory(this.startDate, this.endDate).subscribe(function (checks) { return _this.setChecks(checks); }, function (error) { return _this.errorMessage = error; });
    };
    PatientCheckHistoryComponent.prototype.ngOnDestroy = function () {
        //this.visTimelineService.off(this.visTimelineChecks, 'click');
    };
    PatientCheckHistoryComponent.prototype.focusVisChecks = function () {
        this.visTimelineService.focusOnIds(this.visTimelineChecks, this.listOfItems);
    };
    PatientCheckHistoryComponent = __decorate([
        core_1.Component({
            selector: 'patient-checks',
            template: require('./patient-check-history.component.html'),
            styles: [
                require('./patient-check-history.component.css')
            ],
            providers: [picaso_data_service_1.PicasoDataService, ng2_vis_1.VisTimelineService]
        })
    ], PatientCheckHistoryComponent);
    return PatientCheckHistoryComponent;
}());
exports.PatientCheckHistoryComponent = PatientCheckHistoryComponent;
