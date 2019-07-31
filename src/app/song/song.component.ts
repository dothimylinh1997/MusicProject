import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicsService } from '../service/musics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SongComponent implements OnInit {
  nhac;
  baihat:any
  constructor(private router: Router, private MusicSV: MusicsService) { }

  ngOnInit() {
    this.MusicSV.getMusics().subscribe(data => {
      this.nhac = data;
      console.log(data);
    })
  }
  laynhac(nhac) {
    console.log(nhac);
    localStorage.setItem('idnhac', JSON.stringify(nhac));
    this.router.navigate(['/song-detail']);
  }
}
