import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagecreateComponent } from './messagecreate.component';

describe('MessagecreateComponent', () => {
  let component: MessagecreateComponent;
  let fixture: ComponentFixture<MessagecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
