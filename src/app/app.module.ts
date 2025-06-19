import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { ChangeTaskComponent } from './list-main/change-task/change-task.component';
import { AddTaskComponent } from './list-main/add-task/add-task.component';
import { WatchTaskComponent } from './list-main/watch-task/watch-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    ChangeTaskComponent,
    WatchTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AddTaskComponent // standalone компонент подключаем как импорт
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
