import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home-side-bar.component.html',
  styleUrl: './home-side-bar.component.scss',
})
export class HomeSideBarComponent {
  private readonly _Router = inject(Router);
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this._Router.navigate(['/auth/login']);
  }
}
