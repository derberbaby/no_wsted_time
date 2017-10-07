import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CreateService } from './../../create.service';
import { Create } from './../../create';

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessagelistComponent implements OnInit, OnChanges {
	@Input() childMessages;
	chatElement;
  constructor(private _createService: CreateService) { }

  ngOnInit() {
  	this._createService.serviceGetAllMessages().then( event => {this.childMessages = event.messages}).catch();
  }

  ngOnChanges(){
    // this.chatElement.remove();
  }

  // ngAfterViewInit(){
  //   this.chatElement = document.getElementById('chat-messages');
  // }
}
