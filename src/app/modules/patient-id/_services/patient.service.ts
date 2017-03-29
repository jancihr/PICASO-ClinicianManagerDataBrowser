import {Injectable} from '@angular/core';

@Injectable()
export class PatientService {

    patients: any = [
        {
            "Name": "Sawyer"
        },
        {
            "Name": "Tyrone"
        },
        {
            "Name": "Blaze"
        },
        {
            "Name": "Keane"
        },
        {
            "Name": "Zachery"
        },
        {
            "Name": "Odysseus"
        },
        {
            "Name": "Murphy"
        },
        {
            "Name": "Holmes"
        },
        {
            "Name": "Bradley"
        },
        {
            "Name": "Elvis"
        },
        {
            "Name": "Branden"
        },
        {
            "Name": "Tanner"
        },
        {
            "Name": "Jameson"
        },
        {
            "Name": "Amery"
        },
        {
            "Name": "Price"
        },
        {
            "Name": "Elijah"
        },
        {
            "Name": "Edan"
        },
        {
            "Name": "Quamar"
        }
    ];

    get() {
        return this.patients;
    }

    filter(query) {
        let filteredList = [];
        if (query !== "") {
            filteredList = this.patients.filter(function (el) {
                return el["Name"].toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
        }
        return filteredList;
    }
}
