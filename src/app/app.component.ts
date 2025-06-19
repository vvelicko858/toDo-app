import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from './shared/auth.service';
import {filter, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  private routerSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService)  {}



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

