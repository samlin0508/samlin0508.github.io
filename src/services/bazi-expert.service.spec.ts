import { TestBed } from '@angular/core/testing';

import { BaziExpertService } from './bazi-expert.service';

describe('BaziExpertService', () => {
  let service: BaziExpertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaziExpertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
