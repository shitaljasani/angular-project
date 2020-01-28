import { Component } from '@angular/core';
import {Router} from '@angular/router';

declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simpleBootstrap';
  constructor(private router:Router) {}
  ngOnInit() {    
    var newHost = window.location.host;
    localStorage.setItem('hostUrl',newHost);
    
    // this.router.navigate(['LoginScreen']);
  }
}
