import { TestBed, inject } from '@angular/core/testing';

import { ResizeService } from './resize.service';

xdescribe('ResizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResizeService]
    });
  });

  it('should be created', inject([ResizeService], (service: ResizeService) => {
    expect(service).toBeTruthy();
  }));
});
