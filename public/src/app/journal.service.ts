import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class JournalService {

  constructor(private _http: Http) { }

  serviceCreateEntry(journalEntry) {
  	return this._http.post('/api/add_journal_entry', journalEntry).map( data => data.json()).toPromise();
  }

  serviceFindEntry(date) {
  	return this._http.post('/api/find_journal_entry', {journal_date: date}).map(data => data.json()).toPromise();
  }

  serviceEditEntry(journalEntry) {
  	// console.log("IN SERVICE");
  	return this._http.post('/api/edit_journal_entry', journalEntry).map( data => data.json()).toPromise();
  }
}
