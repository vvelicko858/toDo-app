import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {getMaxId, getUser} from '../../shared/data';
import {addTaskToLocalStorage} from '../../shared/data';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  constructor(private router: Router) {}

  close(): void {
    this.router.navigate(['/user']).then();
    }

  nameTask=''
  descrTask = ''
  dateTask=''

  createCounter(): () => number {
    let i = getMaxId();

    return (): number => {
      return ++i;
    };
  }

  public taskId = this.createCounter();


  save(){
    if(this.nameTask==='' || this.descrTask==='' || this.dateTask===''){
      alert("Все поля должны быть заполнены!!!");
    } else{
      const task:{id:number, taskName:string, taskDescr:string, taskDate: string, done:boolean} = {
        id: this.taskId(),
        taskName:this.nameTask,
        taskDescr: this.descrTask,
        taskDate:this.dateTask,
        done: false
      }
      addTaskToLocalStorage(task)
      getMaxId()
      this.close()
    }
  }
}
