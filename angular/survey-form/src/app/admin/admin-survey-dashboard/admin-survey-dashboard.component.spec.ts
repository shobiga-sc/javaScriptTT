import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSurveyDashboardComponent } from './admin-survey-dashboard.component';

describe('AdminSurveyDashboardComponent', () => {
  let component: AdminSurveyDashboardComponent;
  let fixture: ComponentFixture<AdminSurveyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSurveyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSurveyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
