import { TestBed } from '@angular/core/testing';

import { ListMusicService } from './list-music.service';

describe('ListMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListMusicService = TestBed.get(ListMusicService);
    expect(service).toBeTruthy();
  });
});
