import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictStreamingServicesComponent } from './restrict-streaming-services.component';

describe('RestrictStreamingServicesComponent', () => {
  let component: RestrictStreamingServicesComponent;
  let fixture: ComponentFixture<RestrictStreamingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictStreamingServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictStreamingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
