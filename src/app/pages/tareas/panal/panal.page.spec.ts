import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanalPage } from './panal.page';

describe('PanalPage', () => {
  let component: PanalPage;
  let fixture: ComponentFixture<PanalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
