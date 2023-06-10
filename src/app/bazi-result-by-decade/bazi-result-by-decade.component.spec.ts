import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaziResultByDecadeComponent } from './bazi-result-by-decade.component';

describe('BaziResultByDecadeComponent', () => {
  let component: BaziResultByDecadeComponent;
  let fixture: ComponentFixture<BaziResultByDecadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaziResultByDecadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaziResultByDecadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
