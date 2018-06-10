import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputParseComponent } from './input-parse.component';

describe('InputParseComponent', () => {
  let component: InputParseComponent;
  let fixture: ComponentFixture<InputParseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputParseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputParseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
