import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSurveyDashboardComponent } from './user-survey-dashboard.component';

describe('UserSurveyDashboardComponent', () => {
  let component: UserSurveyDashboardComponent;
  let fixture: ComponentFixture<UserSurveyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSurveyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSurveyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
