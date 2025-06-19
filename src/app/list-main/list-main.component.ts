import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { AuthService } from '../shared/auth.service';
import {deleteTaskFromLocalStorage, getSortedUser, getTasks, getUser, markAsDone} from '../shared/data';
import {CommonModule} from '@angular/common';

interface Task {
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-list-main',
  templateUrl: './list-main.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  styleUrls: ['./list-main.component.scss']
})
export class ListMainComponent  {

  constructor(public router: Router, public authService: AuthService) {  }



  toggleTaskDone(idTask:number): void {
    markAsDone(idTask)
  }

  cardEvent(event: Event): void {
    const target = event.target as Element;
    const currentTarget = event.currentTarget as Element;

    if (!target.closest('button')) {
      const taskId = currentTarget.getAttribute('data-task-id');
      if (taskId) {
        this.router.navigate([`/user/watch`, taskId]).then();
      }
    }
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/']).then();
  }

  taskRemove(id: number): void {
    deleteTaskFromLocalStorage(id)
  }

  change(id: number): void {
    this.router.navigate(['/user/change', id]).then();
  }
  protected readonly AuthService = AuthService;
  protected readonly getUser = getUser;
  protected readonly getSortedUser = getSortedUser;
}
