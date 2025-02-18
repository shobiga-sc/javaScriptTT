import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormPreviewComponent } from './admin-form-preview.component';

describe('AdminFormPreviewComponent', () => {
  let component: AdminFormPreviewComponent;
  let fixture: ComponentFixture<AdminFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
