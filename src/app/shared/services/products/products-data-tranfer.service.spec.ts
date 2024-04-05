import { TestBed } from '@angular/core/testing';

import { ProductsDataTranferService } from './products-data-tranfer.service';

describe('ProductsDataTranferService', () => {
  let service: ProductsDataTranferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDataTranferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
