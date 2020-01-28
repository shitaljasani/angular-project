import { TestBed } from '@angular/core/testing';

import { HttpRouterService } from './http-router.service';

describe('HttpRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRouterService = TestBed.get(HttpRouterService);
    expect(service).toBeTruthy();
  });
});
