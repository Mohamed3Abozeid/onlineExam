import { Component } from '@angular/core';
import { HomeNavBarComponent } from '../../componants/home-navBar/home-nav-bar.component';
import { HomeSideBarComponent } from '../../componants/home-side-bar/home-side-bar.component';
import { NavResponseComponent } from '../../componants/responsave-navBar/nav-response.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HomeNavBarComponent,
    HomeSideBarComponent,
    RouterOutlet,
    NavResponseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  
}
