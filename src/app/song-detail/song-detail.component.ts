import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MusicsService } from '../services/musics.service';
import { Music } from '../interfaces/music.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'] //Sau nay viet code nhung cho khai bao nhieu the nay e nen de dau , vao elm cuoi cung luon
})
export class SongDetailComponent implements OnInit {

  nhac;
  songs;
  musics;
  listMusic;
  linkMS;
  @ViewChild('audioOption', { static: false }) audioPlayerRef: ElementRef;
  constructor(private MusicSV: MusicsService,
    private activatedRoute: ActivatedRoute,
  ) { }
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.MusicSV.getMusicsById(params['id']).subscribe((dataMusic: any) => {
        this.nhac = dataMusic; 

        this.audioPlayerRef.nativeElement.src = dataMusic.linkMusic;
        this.MusicSV.getMusicsByType(this.nhac.musicType._id).subscribe((dataMusics: any) => {
          this.listMusic = dataMusics.music;
          
        });
      });
    })
  }

  laynhac(music) { 
    this.MusicSV.getMusicsById(music._id).subscribe((dataMusic) => {
      this.nhac = dataMusic;
      console.log(this.nhac);
    });
  }
}
