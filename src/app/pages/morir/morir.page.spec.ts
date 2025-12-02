import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MorirPage } from './morir.page';

describe('MorirPage', () => {
  let component: MorirPage;
  let fixture: ComponentFixture<MorirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MorirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
