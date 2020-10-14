import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeblurbsComponent } from './seeblurbs.component';

describe('SeeblurbsComponent', () => {
  let component: SeeblurbsComponent;
  let fixture: ComponentFixture<SeeblurbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeblurbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeblurbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
