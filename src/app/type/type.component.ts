import { Component, OnInit } from '@angular/core';
import { TypeService } from '../services/type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  type;
  constructor(private router: Router, private TypeService: TypeService) { }

  ngOnInit() {
    this.TypeService.getAllType().subscribe(data => {
      this.type = data;
      console.log(this.type);
      
    })
  }
  getType(type) {
    this.TypeService.getTypeByID(type._id).subscribe((dataType)=>{
      if(dataType){
        this.router.navigate(['/type-detail', dataType['_id']]);
      }
    })
  }
}
