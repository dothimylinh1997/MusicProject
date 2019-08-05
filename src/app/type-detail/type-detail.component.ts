import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from '../services/type.service';
import { MusicsService } from '../services/musics.service';
import { SingerService } from '../services/singer.service'

@Component({
  selector: 'app-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: ['./type-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TypeDetailComponent implements OnInit {
  type;
  listMusic:any =[];
  listSinger;
  constructor(private activatedRoute: ActivatedRoute, 
    private TypeService: TypeService, 
    private MusicsService: MusicsService,
    private router: Router,
    private SingerService: SingerService) { }

  ngOnInit() { 
    this.activatedRoute.params.subscribe(params => {
      this.TypeService.getTypeByID(params['id']).subscribe((dataType: any) => {
        this.type = dataType; 
        console.log(this.type);
        this.TypeService.getMusicsByType(this.type._id).subscribe((dataTypes: any) => {
          this.listMusic = dataTypes.music;
          console.log(dataTypes.music._id);
        });
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
}
