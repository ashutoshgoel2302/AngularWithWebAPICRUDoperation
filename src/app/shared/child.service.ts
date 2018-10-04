import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest,HttpHeaders, } from '@angular/common/http';
// import {RequestOptions, Request, RequestMethod} from '@angular/http';


import {Child} from'./child.model'

@Injectable()
export class ChildService {

  headers={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
   selectedChild : Child ={ID:0,FirstName:"",LastName:"",Address:"", Gender:"",BirthDate:null, ChildType:""};
   
   childList : Child[];
  constructor(private http : HttpClient) { }

  
  postChild(child : Child){
    var body = JSON.stringify(child);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    // var requestOptions = new requestOptions({method : RequestMethod.Post,headers : headerOptions});
    // return this.http.post('http://localhost:55642/api/ChildrenDetails',body,requestOptions);
    return this.http.post('http://localhost:61521/api/Children',body,this.headers);
  }

  putChild(id, emp) {
    var body = JSON.stringify(emp);
     var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var requestOptions = new requestOptions({ method: RequestMethod.Put, headers: headerOptions });
    // return this.http.put('http://localhost:55642/api/ChildrenDetails/' + id,
    //   body,
    //   requestOptions);
   
    return this.http.put('http://localhost:61521/api/Children/'+ id, body,this.headers);
  }
  getChildList(){
   return this.http.get<any>('http://localhost:61521/api/Children');
    
  }

  deleteChild(id: number) {
    return this.http.delete('http://localhost:61521/api/Children/' + id);
  }
}
