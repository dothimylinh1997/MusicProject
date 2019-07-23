import { Component, OnInit } from '@angular/core';
import { MusicsService } from '../service/musics.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
baihat
  constructor(private musicsService:MusicsService) { }

  ngOnInit() {
    this.musicsService.getMusicsById('5d3565aba4bc73122cc97486').subscribe((data:any) => {
      // console.log(data);
      this.baihat = `localhost:5000${data.linkMusic}`
      console.log(this.baihat);
      
    })
  }

}
