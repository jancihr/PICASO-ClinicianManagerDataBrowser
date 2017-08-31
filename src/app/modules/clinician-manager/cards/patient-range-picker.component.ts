import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {PicasoOdsCmDataService} from "../service/picaso-data.service";
import {IMyDateRangeModel} from "mydaterangepicker";

@Component({
  selector: 'patient-range-picker',
  templateUrl: './patient-range-picker.component.html',
  styleUrls: ['./patient-range-picker.component.css']

})

export class PatientRangePicker implements OnInit {


  @Output() dateRangeChanged: EventEmitter<MyDateRange> = new EventEmitter();

  @Input() range: MyDateRange;

  //model for custom daterange picker
  model;
  myDateRangePickerOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: "mo",
    inline: false,
    height: '23px',
    selectionTxtFontSize: '0.7rem',
    sunHighlight: true,
  };


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const range: SimpleChange = changes.range;
    this.updatePickerDates();
  }

  updatePickerDates() {
    this.model = {
      beginDate: {
        year: this.range.startDate.getFullYear(),
        month: this.range.startDate.getMonth() + 1,
        day: this.range.startDate.getDate()
      },
      endDate: {
        year: this.range.endDate.getFullYear(),
        month: this.range.endDate.getMonth() + 1,
        day: this.range.endDate.getDate()
      }
    };
  }


  onDateRangeChanged(event: IMyDateRangeModel) {

    /*
    this.range = {
      range: 'custom',
      startDate: event.beginJsDate,
      endDate: event.endJsDate
    };
    */
    this.range.range = 'custom';
    this.dateRangeChanged.emit(
      {
        range: 'custom',
        startDate: event.beginJsDate,
        endDate: event.endJsDate
      });

  }

// when button clicked for changing date range
  rangeChange(rangeString: string) {
    var newRange = this.computeRangeFromString(rangeString);
    if (newRange.startDate !== this.range.startDate || newRange.endDate !== this.range.endDate || newRange.range !== this.range.range) {
      this.dateRangeChanged.emit(this.computeRangeFromString(rangeString));
    }
  }


  computeRangeFromString(rangeStr: string): MyDateRange {

    var endDate = new Date();
    var startDate = new Date();

    if (rangeStr === "lastweek") {

      startDate.setTime(endDate.getTime() - 604800000);
    }

    else if (rangeStr === 'lastmonth') {

      startDate.setTime(endDate.getTime() - 2678400000);
    }

    else if (rangeStr === 'last2months') {

      startDate.setTime(endDate.getTime() - 5270400000);
    }

    else if (rangeStr === 'last6months') {

      startDate.setTime(endDate.getTime() - 15778476000);
    }

    else if (rangeStr === 'next6months') {

      endDate.setTime(startDate.getTime() + 15778476000);
    }

    else if (rangeStr === 'lastyear') {

      startDate.setTime(endDate.getTime() - 31556952000);
    }

    else if (rangeStr === 'last2years') {

      startDate.setTime(endDate.getTime() - 63113904000);
    }

    return {
      startDate: startDate,
      endDate: endDate,
      range: rangeStr
    };
  }
}

export class MyDateRange {
  startDate: Date;
  endDate: Date;
  range: string;
}
