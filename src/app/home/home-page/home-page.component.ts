import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MusicsService } from '../../services/musics.service';
import { SingerService } from '../../services/singer.service';
import { Router } from '@angular/router';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  nhac;
  baihat:any;
  listMusic;
  singers;
  type;
  slideConfig = { 'slidesToShow': 4, 'slidesToScroll': 4, 'dots': true };
  slideConfigtype = { 'slidesToShow': 4, 'slidesToScroll': 4, 'dots': true };
  constructor(private router: Router, 
    private MusicSV: MusicsService,
    private singerService: SingerService,
    private TypeService: TypeService) { }

  ngOnInit() {
    this.MusicSV.getMusics().subscribe(data => {
      this.nhac = data;
      console.log(data);
    });
    this.singerService.getAllSinger().subscribe(data => {
      this.singers = data;
      console.log(data);
    });
    this.TypeService.getAllType().subscribe(data => {
      this.type = data;
      console.log(this.type);
      
    })
  }

  layvideo(nhac) {
    this.MusicSV.getMusicsById(nhac._id).subscribe((dataMusic)=>{
      if(dataMusic){
        this.router.navigate(['/video-detail', dataMusic['_id']]);
      }
    })
  }
  laynhac(music) {
    this.MusicSV.getMusicsById(music._id).subscribe((dataMusic)=>{
      if(dataMusic){
        this.router.navigate(['/song-detail', dataMusic['_id']]);
      }
    }) 
  }
  getType(type) {
    this.TypeService.getTypeByID(type._id).subscribe((dataType)=>{
      if(dataType){
        this.router.navigate(['/type-detail', dataType['_id']]);
      }
    })
  }
  onDetails(_id){
    this.router.navigate([`/singer-detail/${_id}`]);
  }
}
