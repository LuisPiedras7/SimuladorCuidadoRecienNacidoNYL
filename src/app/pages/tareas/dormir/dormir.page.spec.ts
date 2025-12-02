import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DormirPage } from './dormir.page';

describe('DormirPage', () => {
  let component: DormirPage;
  let fixture: ComponentFixture<DormirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DormirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
