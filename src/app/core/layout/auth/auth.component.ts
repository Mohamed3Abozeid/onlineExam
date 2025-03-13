import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './componant/nav-bar/nav-bar.component';
import { AsideBarComponent } from './componant/custom/aside-bar/aside-bar.component';

@Component({
  selector: 'app-auth',
  imports: [NavBarComponent, AsideBarComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
