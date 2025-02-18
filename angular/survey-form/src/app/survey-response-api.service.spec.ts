import { TestBed } from '@angular/core/testing';

import { SurveyResponseApiService } from './survey-response-api.service';

describe('SurveyResponseApiService', () => {
  let service: SurveyResponseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyResponseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
