import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictSocialMediaComponent } from './restrict-social-media.component';

describe('RestrictSocialMediaComponent', () => {
  let component: RestrictSocialMediaComponent;
  let fixture: ComponentFixture<RestrictSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictSocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
