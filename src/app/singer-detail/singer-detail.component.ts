import { Component, OnInit } from '@angular/core';
import { SingerService } from '../services/singer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Singer } from '../interfaces/singer.interface';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.scss']
})
export class SingerDetailComponent implements OnInit {

  _id;
  singer: Singer;
  constructor(private singerService: SingerService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router) { }
    
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this._id = params.get('_id');
      console.log(this._id);
      
      this.singerService.getSingerbyID(this._id).subscribe((data: Singer) => {
        this.singer = data;
        console.log(this.singer);
        
      });
    });
  }

}
