import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SingerService } from '../service/singer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SingerComponent implements OnInit {
  slideConfig
  singers;
  constructor(private router: Router, private singerService: SingerService) { }

  ngOnInit() {
    // this.slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

    this.singerService.getAllSinger().subscribe(data => {
      this.singers = data;
      console.log(data);
    });
  }
  // slideConfig = {
  //   "slidesToShow": 4, 
  //   "slidesToScroll": 1,
  //   "nextArrow":"<div class='nav-btn next-slide'></div>",
  //   "prevArrow":"<div class='nav-btn prev-slide'></div>",
  //   "dots":true,
  //   "infinite": false
  // };
}
