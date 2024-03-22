import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-navegation',
  templateUrl: './toolbar-navegation.component.html',
  styleUrls: []
})
export class ToolbarNavegationComponent {

  constructor(private cookieService: CookieService, private router: Router){}
  handleLogout(): void{
    this.cookieService.delete('USER_INFO');
    void this.router.navigate(['/home']);

  }
}
