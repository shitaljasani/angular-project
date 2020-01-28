import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let headers = new HttpHeaders({ 'Content-type': 'application/json' });
let options = ({ headers: headers });


const url = localStorage.getItem('hostUrl');
@Injectable({
  providedIn: 'root'
})
export class HttpRouterService {
  host: any;
  baseUrl: any;
  constructor(private http: HttpClient) {
 
      this.baseUrl = 'http://localhost:3006/';  
   
   }
    //for login data
  login(data) { // http://localhost:3006/api/admin/login
    sessionStorage.setItem('userName', data.userName);
    sessionStorage.setItem('password', data.password);
    return this.http.post(this.baseUrl + 'api/admin/login', data);
  }
  //Manage Item Router 
  getManageItemList(data){ // http://localhost:3006/api/admin/getManageItemList
    return this.http.post(this.baseUrl + 'api/admin/getManageItemList', data);
  } 
  manageItemInsert(data){// http://localhost:3006/api/admin/getManageItemDetails
    return this.http.post(this.baseUrl + 'api/admin/manageItemInsert', data);
  }
  getManageItemData(data){// http://localhost:3006/api/admin/getManageItemDetails
    return this.http.post(this.baseUrl + 'api/admin/getManageItemDetails', data);
  } 

}
