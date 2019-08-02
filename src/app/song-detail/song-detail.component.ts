import { Component, OnInit } from '@angular/core';
import { MusicsService } from '../services/musics.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {

  id=JSON.stringify(localStorage.getItem('idnhac'));
  nhac:any
  constructor(private MusicSV:MusicsService) { }
  ngAfterViewInit() {
    // console.log('AfterViewInit');
  }
  ngOnInit() {
     this.nhac=JSON.parse(`${localStorage.getItem('idnhac')}`);
  }

}
