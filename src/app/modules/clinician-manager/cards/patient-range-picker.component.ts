import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {PicasoDataService} from "../service/picaso-data.service";
import {IMyDateRangeModel} from "mydaterangepicker";

@Component({
  selector: 'patient-range-picker',
  templateUrl: './patient-range-picker.component.html',
  styleUrls: ['./patient-range-picker.component.css'],
  providers: [PicasoDataService]

})

export class PatientRangePicker implements OnInit {


  @Output() changed: EventEmitter<MyDateRange> = new EventEmitter();

  @Input() range: MyDateRange;

  //model for custom daterange picker
  model;
  myDateRangePickerOptions;


  ngOnInit() {

    this.updatePickerDates();

    this.myDateRangePickerOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
      firstDayOfWeek: "mo",
      inline: false,
      height: '25px',
      selectionTxtFontSize: '15px',
      sunHighlight: true,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    const range: SimpleChange = changes.range;
    console.log('prev value: ', range.previousValue);
    console.log('new value: ', range.currentValue);
    this.updatePickerDates();
  }

  updatePickerDates() {
    this.model = {
      beginDate: {
        year: this.range.startDate.getFullYear(),
        month: this.range.startDate.getMonth(),
        day: this.range.startDate.getDay()
      },
      endDate: {
        year: this.range.endDate.getFullYear(),
        month: this.range.endDate.getMonth(),
        day: this.range.endDate.getDay()
      }
    };
  }


  onDateRangeChanged(event: IMyDateRangeModel) {
    //console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
    //console.log('onDateRangeChanged(): Formatted: ', event.formatted);
    //console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
    this.range = {
      range: 'custom',
      startDate: event.beginJsDate,
      endDate: event.endJsDate
    };
    this.changed.emit(this.range);
  }


  rangeChanged(rangeString: string) {

    this.changed.emit(this.computeRangeFromString(rangeString));
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
