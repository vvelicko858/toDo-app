import {Component, AfterViewInit, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {

  private routerSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const defElement = document.getElementById('def');

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      if (url === '/') {
        this.renderer.setStyle(defElement, 'display', 'block');
      } else {
        this.renderer.setStyle(defElement, 'display', 'none');
      }
    });
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      if (!url.includes('/user')) {
        this.authService.logout();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
