import { Component, OnInit } from '@angular/core';
import { ChildService } from '../shared/child.service';
import { Child } from '../shared/child.model';
import {Router} from "@angular/router";

@Component({
  //  selector: 'app-listchildren',
  templateUrl: './listchildren.component.html',
  styleUrls: ['./listchildren.component.css'],
  // providers: [ChildService]
})
export class ListchildrenComponent implements OnInit {

 public  Data:[];
  constructor(private childservice: ChildService, private router: Router) { }

  ngOnInit() {
   
    this.getData();
  }

  getData(){
   this.childservice.getChildList().subscribe(data => {
     this.Data=data;
   
   }); 
   
  }
  showForEdit(child: Child) {
    
    this.childservice.selectedChild = child;
    this.router.navigate(['Create']);
  }


  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.childservice.deleteChild(id)
      .subscribe(x => {
         this.childservice.getChildList();
        this.router.navigate(['List']);
      })
    }
  }
}
