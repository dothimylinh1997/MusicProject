import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UsersService } from '../service/users.service';
import { FormGroup, FormControl } from '@angular/forms';

// export let browserRefresh = false;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService) { }
  loginForm:FormGroup;
  browserRefresh:true
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  onLogin() {
    console.log(this.loginForm.value);
    
    this.userService.onLogin(this.loginForm.value).subscribe((response) => {
      console.log(response);

      if (response) {
        localStorage.setItem('user', JSON.stringify(response.fullName));
        this.router.navigate(['home']);
        setTimeout(()=>{
        document.location.reload(true)
        },100)
      //   this.router.events.subscribe((event) => {
      //     if (event instanceof NavigationStart) {
      //       browserRefresh = !this.router.navigated;
      //     }
      // });
      }
    }, err => {
      if (err) {
        alert("Vui lòng kiểm tra thông tin đăng nhập");
      }
    });
  }
}
