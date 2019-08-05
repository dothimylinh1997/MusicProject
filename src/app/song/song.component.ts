import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicsService } from '../services/musics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SongComponent implements OnInit {
  nhac
  baihat:any
  constructor(private router: Router, private MusicSV: MusicsService) { }

  ngOnInit() {
    this.MusicSV.getMusics().subscribe(data => {
      this.nhac = data;
      console.log(this.nhac);
    })
  }
  laynhac(music) {
    this.MusicSV.getMusicsById(music._id).subscribe((dataMusic)=>{
      if(dataMusic){
        this.router.navigate(['/song-detail', dataMusic['_id']]);
      }
    })
  }
}
