import { TestBed } from '@angular/core/testing';

import { MusicsService } from './musics.service';

describe('MusicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicsService = TestBed.get(MusicsService);
    expect(service).toBeTruthy();
  });
});
