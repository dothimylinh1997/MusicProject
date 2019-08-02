import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { MusicsService } from '../services/musics.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit,AfterViewInit {
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
