import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  constructor(private router: Router, private userService: UsersService) { }
  updateForm: FormGroup;
  ngOnInit() {
    this.updateForm = new FormGroup({
      email: new FormControl(),
      fullName: new FormControl(),
      password: new FormControl()
    });
    this.ten = JSON.parse(`${localStorage.getItem('fullName')}`);
    this.gmail = JSON.parse(`${localStorage.getItem('email')}`);
    this.pass = JSON.parse(`${localStorage.getItem('password')}`);
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    this.userService.getUserbyID(this.user._id).subscribe(data => {
      this.user = data;
    })
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
