import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersService) { }
  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(),
      fullName: new FormControl(),
      password: new FormControl()
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
      ]]
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