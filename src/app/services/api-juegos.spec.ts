import { TestBed } from '@angular/core/testing';

import { ApiJuegos } from './api-juegos';

describe('ApiJuegos', () => {
  let service: ApiJuegos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiJuegos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
