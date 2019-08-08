import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SingerService } from '../services/singer.service';
import { MusicsService } from '../services/musics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Singer } from '../interfaces/singer.interface';
import { Music } from '../interfaces/music.interface';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SingerDetailComponent implements OnInit {

  _id;
  singer: Singer;
  music;
  id;
  constructor(private singerService: SingerService, 
    private activatedRoute: ActivatedRoute, 
    private MusicsService: MusicsService,
    private router: Router) { }
    
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this._id = params.get('_id');   
      console.log(this._id);
       
      this.MusicsService.getMusicBySinger(this._id).subscribe((data: Singer) => {
        this.singer = data;
        this.music = data.music;
        console.log(this.singer);
        
      });
    });
    
  }
  laynhac(music) {
    this.MusicsService.getMusicsById(music._id).subscribe((dataMusic)=>{
      if(dataMusic){
        this.router.navigate(['/song-detail', dataMusic['_id']]);
      }
    })
  }
  layvideo(music) {
    this.MusicsService.getMusicsById(music._id).subscribe((dataMusic)=>{
      if(dataMusic){
        
        this.router.navigate(['/video-detail', dataMusic['_id']]);
      }
    })
  }
  // getMusicBySinger(){
  //   console.log(this._id);
    
  //   this.MusicsService.getMusicBySinger(this._id).subscribe((data: Music) => {
  //     this.music = data;
  //     console.log(this.music.musicName);
  //   });
   
  // }

}
