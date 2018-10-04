import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChildService } from '../shared/child.service';
import {Router} from "@angular/router";


@Component({
  // selector: 'app-createchildren',
  templateUrl: './createchildren.component.html',
  styleUrls: ['./createchildren.component.css'],
  // providers:[ChildService]
})
export class CreatechildrenComponent implements OnInit {
  GenderList = ['Male', 'Female', 'Others'];
  ChildTypeList=['wee watch','own','private'];
 
  constructor(private childservice:ChildService, private router:Router, private formBuilder:FormBuilder) { }
  childForm: FormGroup;


  ngOnInit() {

    
  console.log(this.childservice.selectedChild);
    if(this.childservice.selectedChild.ID == 0)
    {
      
      this.childForm=  this.formBuilder.group({
        ID: [''],
        FirstName:['',Validators.required],
        LastName:['',Validators.required],
        Address:['',Validators.required],
        Gender:['',Validators.required],
        BirthDate:['',Validators.required],
        ChildType:['',Validators.required]
      })
    }
 
    else
    {
      this.childForm=  this.formBuilder.group({
        ID: [''],
        FirstName:['',Validators.required],
        LastName:['',Validators.required],
        Address:['',Validators.required],
        Gender:['',Validators.required],
        BirthDate:['',Validators.required],
        ChildType:['',Validators.required]
      })
     
      this.childForm.setValue({
        ID: this.childservice.selectedChild.ID,
        FirstName:this.childservice.selectedChild.FirstName,
        LastName:this.childservice.selectedChild.LastName,
        Address:this.childservice.selectedChild.Address,
        Gender:this.childservice.selectedChild.Gender,
        BirthDate:this.childservice.selectedChild.BirthDate,
        ChildType:this.childservice.selectedChild.ChildType
      }
       
       
      )
    }
   
  }
  onSubmit():void 
  {
    if(this.childForm.value.ID==0)
    {
     console.log(this.childForm.value);
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