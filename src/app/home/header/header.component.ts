import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user;
  ten;
  email;
  password;
  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.ten = JSON.parse(`${localStorage.getItem('fullName')}`);
    this.email = JSON.parse(`${localStorage.getItem('email')}`);
    this.password = JSON.parse(`${localStorage.getItem('password')}`);
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    this.userService.getUsers().subscribe(data => {
      this.user = data;
      console.log(data);
    });
    // this.userService.getUserbyID(this.user._id).subscribe(data => {
    //   this.user = data;
    // })
  }
  onLogout() {
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('idnhac');
    localStorage.removeItem('user');
    this.router.navigate(['home']);
    setTimeout(() => {
      document.location.reload(true)
    }, 100)
  }
  layuser(user) {
    console.log(user);
    localStorage.setItem('idnhac', JSON.stringify(user));
  }
}
