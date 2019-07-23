import { Component, OnInit } from '@angular/core';
import { MusicsService } from '../service/musics.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(private musicsService: MusicsService) { }
  baihat
  ngOnInit() {
    this.musicsService.getMusicsById('5d3565aba4bc73122cc97486').subscribe((data:any) => {
      // console.log(data);
      this.baihat = `localhost:5000${data.linkMusic}`
      
    })
    // this.musicsService.getMusics().subscribe((data) => {
    //   console.log(data);
     
    // })
    // console.log('ahihi');


  }

}
