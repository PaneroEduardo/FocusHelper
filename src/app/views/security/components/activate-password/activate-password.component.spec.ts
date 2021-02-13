import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatePasswordComponent } from './activate-password.component';

describe('Component: ActivatePasswordComponent', () => {
    let component: ActivatePasswordComponent;
    let fixture: ComponentFixture<ActivatePasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivatePasswordComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivatePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });
});
