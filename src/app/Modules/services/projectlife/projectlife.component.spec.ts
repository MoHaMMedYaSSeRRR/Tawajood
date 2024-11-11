import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectlifeComponent } from './projectlife.component';

describe('ProjectlifeComponent', () => {
  let component: ProjectlifeComponent;
  let fixture: ComponentFixture<ProjectlifeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectlifeComponent]
    });
    fixture = TestBed.createComponent(ProjectlifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
