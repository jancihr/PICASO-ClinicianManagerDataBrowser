"use strict";
var PatientObservation = (function () {
    function PatientObservation() {
    }
    PatientObservation.prototype.dateFormatted = function () {
        return this.date.toLocaleDateString();
    };
    return PatientObservation;
}());
exports.PatientObservation = PatientObservation;
