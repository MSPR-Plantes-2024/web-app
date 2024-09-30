import { TestBed } from '@angular/core/testing';

import { PlantConditionService } from '../plant-condition.service';

describe('PlantConditionService', () => {
  let service: PlantConditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantConditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
