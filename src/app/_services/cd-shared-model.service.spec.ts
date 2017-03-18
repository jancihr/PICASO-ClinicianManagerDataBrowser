/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CdSharedModelService } from './cd-shared-model.service';

describe('Service: CdSharedModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdSharedModelService]
    });
  });

  it('should ...', inject([CdSharedModelService], (service: CdSharedModelService) => {
    expect(service).toBeTruthy();
  }));
});
