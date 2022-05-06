import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user$ = this.authService.currentUser$;
 
  constructor(public authService: AuthenticationService,
    private router: Router){

  }

  logout(){ // upon subscription callback to landing page
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['']);
    });
  }
}