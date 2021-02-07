import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictCustomUrlsComponent } from './restrict-custom-urls.component';

describe('RestrictCustomUrlsComponent', () => {
  let component: RestrictCustomUrlsComponent;
  let fixture: ComponentFixture<RestrictCustomUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictCustomUrlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictCustomUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
