import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicsService } from '../service/musics.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit {
  nhac;
  baihat:any
  constructor(private router: Router, private MusicSV: MusicsService) { }

  ngOnInit() {

    this.MusicSV.getMusics().subscribe(data => {
      this.nhac = data;
      console.log(data);
    })
    // this.MusicSV.getMusicsById('5d3d5de79acacd30b8c1fa6a').subscribe(data => {
    //   console.log(data);

    // });
  }
  laynhac(nhac) {
    // console.log(nhac);
    // this.MusicSV.getMusicsById(nhac._id).subscribe(data => {
      console.log(nhac);
    // });
    
    localStorage.setItem('idnhac', JSON.stringify(nhac));
    this.router.navigate(['/video-detail']);
  }
}
