import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {

  ten;
  gmail;
  pass;
  user;
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UsersService) { }
  updateForm: FormGroup;
  ngOnInit() {
    this.updateForm = new FormGroup({
      email: new FormControl(),
      fullName: new FormControl(),
      password: new FormControl(),
      newPassword: new FormControl()
    });
    this.ten = JSON.parse(`${localStorage.getItem('fullName')}`);
    this.gmail = JSON.parse(`${localStorage.getItem('email')}`);
    this.pass = JSON.parse(`${localStorage.getItem('password')}`);
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    this.userService.getUserbyID(this.user._id).subscribe(data => {
      this.user = data;
    })
    this.buildForm();
  }
  buildForm(){
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    this.updateForm = this.formBuilder.group({
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
      newPassword: ['', [
        Validators.required
      ]]
    });
  }
  onUpdate(){
    console.log(this.updateForm.value);

    this.userService.onUpdate(this.user._id, this.updateForm.value).subscribe((response)=>{
      console.log(response);
      if(response){
        alert("Cập nhật thành công");
      }
    }, err =>{
      if(err.status === 404){
        console.log(err.error.message);
        alert(err.error.message);
      }
    })
  }
}
