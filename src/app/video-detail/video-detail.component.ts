import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { MusicsService } from '../services/musics.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  
  nhac;
  listMusic;
   @ViewChild('videoOption', { static: false }) videoPlayerRef: ElementRef;
  constructor(private MusicSV:MusicsService, private activatedRoute: ActivatedRoute, private elRef: ElementRef) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.MusicSV.getMusicsById(params['id']).subscribe((dataMusic: any) => {
        this.nhac = dataMusic; 
        this.videoPlayerRef.nativeElement.src = dataMusic.linkMusic;
        this.MusicSV.getMusicsByType(this.nhac.musicType._id).subscribe((dataMusics: any) => {
          this.listMusic = dataMusics.music;
        });
      });
    })
  }
}
