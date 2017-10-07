import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { CreateService } from './../create.service';
import { UserService } from './../user.service';
import { Create } from './../create';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
	id;
	private sub: any;
	event: Create;
  friend;
  messages;

  constructor(
  	private _userService: UserService,
  	private _createService: CreateService,
  	private _router: Router,
  	private _route: ActivatedRoute ) { }

  ngOnInit() {
  	this.sub = this._route.params.subscribe(param=>
  		this.id = param
  	);

  	this.getEvent(this.id)
  }

  getEvent(eventID){
  	this._createService.serviceEventDetails(eventID)
  	.then( details => {
  		this.event = details;
  	})
  	.catch( err => {
  		console.log(err);
  	})
  }

  invite() {
    console.log("component", this.id);
    this._userService.serviceInviteFriend(this.id.id, this.friend)
    .then( data => {
      this.event = data
    }).catch();
  }

  editTitle(value) {
    this._createService.serviceEditTitle(this.id, value)
    .then( data => {
      this.event = data;
    }).catch( err => {
      console.log(err)
    });
  }

  editCategory(value) {
    this._createService.serviceEditCategory(this.id, value)
    .then( data => {
      this.event = data;
    }).catch( err => {
      console.log(err)
    });
  }

  editDescription(value) {
    this._createService.serviceEditDescription(this.id, value)
    .then( data => {
      this.event = data;
    }).catch( err => {
      console.log(err)
    })
  }

  editStart(value){
    console.log(value)
    this._createService.serviceEditStart(this.id, value)
     .then( data => {
      this.event = data;
    }).catch( err => {
      console.log(err)
    })
  }

  editEnd(value){
  console.log(value)
    this._createService.serviceEditEnd(this.id, value)
     .then( data => {
      this.event = data;
    }).catch( err => {
      console.log(err)
    })
  }

  createMessage(message){
  this._createService.serviceCreateMessage(message, this.id.id)
    .then( data => {
      console.log("BEFORE erasing MESSAGES", this.messages)
      this.messages = [];
      console.log("BEFORE EDITING MESSAGES", this.messages)
      this.messages = data.messages;
      console.log("AFTER REASSIGNING", this.messages);
    } )
    .catch()
  }

}
