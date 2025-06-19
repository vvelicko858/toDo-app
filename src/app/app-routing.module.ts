import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {ListMainComponent} from './list-main/list-main.component';
import {AuthGuard} from './shared/auth.guard';
import {AddTaskComponent} from './list-main/add-task/add-task.component';
import {ChangeTaskComponent} from './list-main/change-task/change-task.component';
import {WatchTaskComponent} from './list-main/watch-task/watch-task.component';

const routes: Routes = [
  {path: 'reg', component: AuthComponent},
  {path: 'user', component: ListMainComponent, canActivate: [AuthGuard],
  children:[
    {path: 'addTask', component: AddTaskComponent},
    {path: 'change/:id', component: ChangeTaskComponent},
    {path: 'watch/:id', component: WatchTaskComponent},
  ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
