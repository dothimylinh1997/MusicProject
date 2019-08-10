import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicsService } from 'src/app/services/musics.service';
import { ListMusicService } from '../../services/list-music.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaylistDetailComponent implements OnInit {
nhac;
music;
idmusic;
list;
  constructor( private activatedRoute: ActivatedRoute,
              private MusicsService: MusicsService,
              private router: Router,
              private listMusicService: ListMusicService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.MusicsService.getMusicByList(params['id']).subscribe((dataMusic: any) => {
        this.nhac = dataMusic; 
        console.log(this.nhac);
        
        this.music = dataMusic.music;
        console.log(this.music);
        
        
      });
    })
  }
  layvideo(nhac) {
    this.MusicsService.getMusicsById(nhac._id).subscribe((dataMusic)=>{
      if(dataMusic){
        this.router.navigate(['/video-detail', dataMusic['_id']]);
      }
    })
  }
  laynhac(music) {
    this.MusicsService.getMusicsById(music._id).subscribe((dataMusic)=>{
      if(dataMusic){
        this.router.navigate(['/song-detail', dataMusic['_id']]);
      }
    }) 
  }
  getIDMusictoDelete(id){
    console.log(id);
    this.idmusic = id;
  }
  DeleteMusic(id){
   this.music.map((data)=>{
     if(data['_id']== id){
      this.music.splice(this.music.indexOf(data), 1);
     }
   })
   
  this.listMusicService.getListByID(this.nhac._id).subscribe((data:any) => {
    this.list={
      music: this.music
    }
    
    this.listMusicService.updateListMusic(this.nhac._id, this.list).subscribe(ahihi => {
      this.router.navigate(['/playlist-detail', data['_id']]);
        setTimeout(()=>{
        document.location.reload(true)
        },100)
    })
  })
  }
}
