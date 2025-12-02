import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlimentarPage } from './alimentar.page';

describe('AlimentarPage', () => {
  let component: AlimentarPage;
  let fixture: ComponentFixture<AlimentarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
