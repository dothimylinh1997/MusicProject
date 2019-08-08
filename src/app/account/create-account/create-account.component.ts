import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})

export class CreateAccountComponent implements OnInit {
  user;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersService) { }
  signupForm: FormGroup;
  ngOnInit() {
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    this.userService.getUserbyID(this.user._id).subscribe(data => {
      this.user = data;
      console.log(this.user);
    })


    this.signupForm = new FormGroup({
      email: new FormControl(),
      fullName: new FormControl(),
      password: new FormControl(),
      role: new FormControl()
    });
    this.buildForm();
  }
  buildForm(){
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    this.signupForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]],
      fullName: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      role_: ['1',[]]
    });
  }
  onSignup(){
    console.log(this.signupForm.value);

    this.userService.onSignup(this.signupForm.value).subscribe((response)=>{
      console.log(response);
      if(response){
        alert("Đăng ký thành công");
        this.router.navigate(['login']);
      }
    }, err =>{
      if(err.status === 404){
        console.log(err.error.message);
        alert(err.error.message);
      }
    })
    
  }
}

