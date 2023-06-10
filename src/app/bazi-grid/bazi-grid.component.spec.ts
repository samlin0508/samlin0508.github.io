import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaziGridComponent } from './bazi-grid.component';

describe('BaziGridComponent', () => {
  let component: BaziGridComponent;
  let fixture: ComponentFixture<BaziGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaziGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaziGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
