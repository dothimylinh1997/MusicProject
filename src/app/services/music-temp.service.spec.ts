import { TestBed } from '@angular/core/testing';

import { MusicTempService } from './music-temp.service';

describe('MusicTempService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicTempService = TestBed.get(MusicTempService);
    expect(service).toBeTruthy();
  });
});
