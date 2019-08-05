import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MusicsService } from '../../services/musics.service';
import { SingerService } from '../../services/singer.service';
import { TypeService } from '../../services/type.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user;
  ten;
  email;
  avata;
  password;
  searchText;
  nhac;
  type;
  singers;
  constructor(private router: Router,
    private userService: UsersService,
    private musicService: MusicsService,
    private typeService: TypeService,
    private singerService: SingerService) { }

  ngOnInit() {

    this.ten = JSON.parse(`${localStorage.getItem('fullName')}`);
    this.email = JSON.parse(`${localStorage.getItem('email')}`);
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    this.avata = JSON.parse(`${localStorage.getItem('avata')}`);

    this.userService.getUsers().subscribe(data => {
      this.user = data;
      console.log(data);
    });
    this.userService.getUserbyID(this.user._id).subscribe(data => {
      this.user = data;
      console.log(this.user.role_);

    })

    this.getData();
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['home']);
    setTimeout(() => {
      document.location.reload(true)
    }, 100)
  }
  layuser(user) {
    console.log(user);
    localStorage.setItem('idnhac', JSON.stringify(user));
  }
  getData() {
    this.nhac = [];
    this.singers = [];
    if (this.searchText != '') {
      this.musicService.getMusics().subscribe(data => {
        this.nhac = data;
      });
      this.singerService.getAllSinger().subscribe(data => {
        this.singers = data;
      });
    }
  }

  laynhac(music) {
    
    this.nhac = [];
    this.singers = [];
    this.musicService.getMusicsById(music._id).subscribe((dataMusic) => {
      if (music.isVideo == '0') {
        this.router.navigate(['/song-detail', dataMusic['_id']]);
      }
      else {
        this.router.navigate(['/video-detail', dataMusic['_id']]);
      }
    })
  }
  onDetails(_id) {
    this.singers = [];
    this.nhac = [];
    this.router.navigate([`/singer-detail/${_id}`]);
  }

}
