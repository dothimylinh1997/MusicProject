import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MusicsService } from '../service/musics.service';
import { SingerService } from '../service/singer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  nhac;
  baihat:any;
  slideConfig;
  singers;
  constructor(private router: Router, private MusicSV: MusicsService, private singerService: SingerService) { }

  ngOnInit() {

    this.MusicSV.getMusics().subscribe(data => {
      this.nhac = data;
      console.log(data);
    });
    this.singerService.getAllSinger().subscribe(data => {
      this.singers = data;
      console.log(data);
    });
  }
  laynhac(nhac) {
    console.log(nhac);
    localStorage.setItem('idnhac', JSON.stringify(nhac));
    this.router.navigate(['/song-detail']);
  }
  layvideo(nhac) {
    console.log(nhac);
    localStorage.setItem('idnhac', JSON.stringify(nhac));
    this.router.navigate(['/video-detail']);
  }
}
