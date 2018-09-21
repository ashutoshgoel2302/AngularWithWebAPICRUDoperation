import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule,Routes} from '@angular/router'
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
// import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import { ChildService } from './shared/child.service';

import { AppComponent } from './app.component';
import { ListchildrenComponent } from './children/listchildren.component';
import { CreatechildrenComponent } from './children/createchildren.component';
import { UploadComponent } from './children/upload.component';
import { FilterdataPipe } from './children/filterdata.pipe';

 const approutes :Routes = [
   {path:'Create', component: CreatechildrenComponent},
   {path:'List', component: ListchildrenComponent},
   {path:'',redirectTo:'/List', pathMatch:'full'},
   { path: 'Upload', component: UploadComponent },
 ]
@NgModule({
  declarations: [
    AppComponent,
    ListchildrenComponent,
    CreatechildrenComponent,
    UploadComponent,
    FilterdataPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(approutes),
    FormsModule,
    ReactiveFormsModule,
    // HttpModule,
    HttpClientModule
  ],
  providers: [ChildService],
  bootstrap: [AppComponent]
})
export class AppModule { }
