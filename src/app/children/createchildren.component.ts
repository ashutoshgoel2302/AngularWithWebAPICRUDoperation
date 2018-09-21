import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ChildService } from '../shared/child.service';
import {Router} from "@angular/router";


@Component({
  // selector: 'app-createchildren',
  templateUrl: './createchildren.component.html',
  styleUrls: ['./createchildren.component.css'],
  // providers:[ChildService]
})
export class CreatechildrenComponent implements OnInit {

  constructor(private childservice:ChildService, private router:Router) { }

  childForm: FormGroup;


  ngOnInit() {

    if(this.childservice.selectedChild.ID == null)
    {
      this.childForm= new FormGroup({
        ID: new FormControl(),
        FirstName:new FormControl(),
        LastName:new FormControl(),
        Address:new FormControl(),
        Gender:new FormControl()
  
      })
    }
 
    else
    {
      this.childForm= new FormGroup({
        ID: new FormControl(this.childservice.selectedChild.ID),
        FirstName:new FormControl(this.childservice.selectedChild.FirstName),
        LastName:new FormControl(this.childservice.selectedChild.LastName),
        Address:new FormControl(this.childservice.selectedChild.Address),
        Gender:new FormControl(this.childservice.selectedChild.Gender)
  
      })
    }
   
  }
  onSubmit():void 
  {
    if(this.childForm.value.ID==null)
    {
     
      this.childservice.postChild(this.childForm.value)
        .subscribe(data => {
         
          this.childservice.getChildList();
          this.router.navigate(['List']);
        })
    }
    else{
      
      this.childservice.putChild(this.childForm.value.ID,this.childForm.value)
        .subscribe(data => {
         
          this.childservice.getChildList();
          this.router.navigate(['List']);
        })
    }
     
    
    
}
}