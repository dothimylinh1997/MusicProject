import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// export let browserRefresh = false;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UsersService) { }
  loginForm:FormGroup;
  browserRefresh:true
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
    this.buildForm();
  }
  buildForm(){
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }
  onLogin() {
    console.log(this.loginForm.value);
    
    this.userService.onLogin(this.loginForm.value).subscribe((response) => {
      if (response) {
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('fullName', JSON.stringify(response.fullName));
        localStorage.setItem('email', JSON.stringify(response.email));
        localStorage.setItem('avata', JSON.stringify(response.avata));
        
        this.router.navigate(['home']);
        setTimeout(()=>{
        document.location.reload(true)
        },100)
      }
    }, err => {
      if (err) {
        alert("Vui lòng kiểm tra thông tin đăng nhập");
      }
    });
  }
}
