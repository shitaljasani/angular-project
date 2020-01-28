import { Component, OnInit } from '@angular/core';
import "../../assets/js/front.js";
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  selectManu =""
  constructor(private router:Router) { 
    console.log("DashbordComponent : call................!")
  }

  ngOnInit() {
    console.log("DashbordComponent : call................!1")
   
  }
  menuClick(actionName,event){
    console.log("menuClick : call.............!");
    if(actionName == 'manageItems') {
      this.selectManu = "manageItems";      
    } 
  }
}
