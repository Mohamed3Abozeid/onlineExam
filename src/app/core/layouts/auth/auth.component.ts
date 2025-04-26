import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './auth-componants/nav-bar/nav-bar.component';
import { AsideBarComponent } from './auth-componants/custom-componants/aside-bar/aside-bar.component';

@Component({
  selector: 'app-auth',
  imports: [NavBarComponent, AsideBarComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
