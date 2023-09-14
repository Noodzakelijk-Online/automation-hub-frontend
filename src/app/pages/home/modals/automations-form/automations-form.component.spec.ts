import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationsFormComponent } from './automations-form.component';

describe('AutomationsFormComponent', () => {
  let component: AutomationsFormComponent;
  let fixture: ComponentFixture<AutomationsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomationsFormComponent]
    });
    fixture = TestBed.createComponent(AutomationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
