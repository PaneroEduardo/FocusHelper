import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictSitesComponent } from './restrict-sites.component';

describe('RestrictSitesComponent', () => {
  let component: RestrictSitesComponent;
  let fixture: ComponentFixture<RestrictSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictSitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
