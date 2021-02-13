import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SecurityComponent } from './security.component';

describe('Component: SecurityComponent', () => {
    let component: SecurityComponent;
    let fixture: ComponentFixture<SecurityComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SecurityComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecurityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });
});
