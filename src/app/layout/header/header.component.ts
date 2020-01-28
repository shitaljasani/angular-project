import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  toggleClick(e){
    console.log("toggleClick :call..........!");
    e.preventDefault();
    $(this).toggleClass('active');

    $('.side-navbar').toggleClass('shrinked');
    $('.content-inner').toggleClass('active');
    $(document).trigger('sidebarChanged');

    if ($(window).outerWidth() > 1183) {
        // console.log("toggle-btn : call..............!")
        if ($('#toggle-btn').hasClass('active')) {
            $('.navbar-header .brand-small').hide();
            $('.navbar-header .brand-big').show();
        } else {
            $('.navbar-header .brand-small').show();
            $('.navbar-header .brand-big').hide();
        }
    }

    if ($(window).outerWidth() < 1183) {
        $('.navbar-header .brand-small').show();
    }
   

  }
}
