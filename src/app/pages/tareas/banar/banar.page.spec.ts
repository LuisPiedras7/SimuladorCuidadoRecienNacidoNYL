import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BanarPage } from './banar.page';

describe('BanarPage', () => {
  let component: BanarPage;
  let fixture: ComponentFixture<BanarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BanarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
