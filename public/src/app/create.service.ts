import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class CreateService {

  constructor(private _http: Http) { }

  serviceCreate(newThing) {
    return this._http.post('/api/creates', newThing)
      .map( (response) => response.json())
      .toPromise()
  }

  serviceGetEvents(date){
  	console.log("IN CREATE SERVICE", date);
  	return this._http.post('/api/getEvents', date)
  		.map ( (response) => response.json())
      .toPromise()
  }

  serviceEventDetails(eventID){
  	return this._http.get('/api/details/'+ eventID.id)
  		.map ( (response) => response.json())
      .toPromise()
  }

  serviceEditTitle(eventID, editedTitle) {
    console.log("SERVICE", event);
    return this._http.post('/api/edit/title/' + eventID, { title: editedTitle} )
    .map( (response) => response.json())
    .toPromise()
  }

  serviceEditCategory(eventID, editedCategory) {
  console.log("SERVICE", event);
    return this._http.post('/api/edit/category/' + eventID, { category: editedCategory} )
    .map( (response) => response.json())
    .toPromise()
  }

  serviceEditDescription(eventID, editedDescription){
    return this._http.post('/api/edit/description/' + eventID, { description: editedDescription } )
    .map ( res => res.json())
    .toPromise()
  }

  serviceEditStart(eventID, editedStart){
    return this._http.post('/api/edit/start/' + eventID, { start_date: editedStart } )
    .map ( res => res.json())
    .toPromise()
  }

  serviceEditEnd(eventID, editedEnd){
    return this._http.post('/api/edit/end/' + eventID, { end_date: editedEnd } )
    .map ( res => res.json())
    .toPromise()
  }

  serviceCreateMessage(message, eventID){
    return this._http.post('/api/messages/add/' + eventID, message)
    .map( (response) => response.json())
    .toPromise()
  }

  serviceGetAllMessages(){
    return this._http.get('/api/get_all_messages').map( (response) => response.json()).toPromise();
  }

}
