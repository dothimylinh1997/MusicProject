import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicsService } from '../services/musics.service';
import { SingerService } from '../services/singer.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  nhac: any;
  user:any;
  constructor(private router: Router, private MusicSV: MusicsService, private singerService: SingerService, private usersService: UsersService) { }

  ngOnInit() {
    this.MusicSV.getMusics().subscribe(data => {
      this.nhac = data;
      console.log(data);
    });
    this.usersService.getUsers().subscribe(data => {
      this.user = data;
      console.log(this.user);
      
    });
  }

}
