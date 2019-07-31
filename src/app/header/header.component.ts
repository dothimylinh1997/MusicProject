import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ten
  constructor(private router: Router) { }

  ngOnInit() {
   this.ten= JSON.parse(`${localStorage.getItem('user')}`);
  
  }
  onLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['home']);
    setTimeout(()=>{
          
      document.location.reload(true)
      },100)
  }
}
