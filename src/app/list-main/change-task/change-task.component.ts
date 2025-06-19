import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {addTaskToLocalStorage, changeTask, deleteTaskFromLocalStorage, getMaxId, getTasks} from '../../shared/data';

@Component({
  selector: 'app-change-task',
  standalone: false,
  templateUrl: './change-task.component.html',
  styleUrl: './change-task.component.scss'
})


export class ChangeTaskComponent {

  constructor(private route: ActivatedRoute, private router: Router) {
  }


  close(): void {
    this.router.navigate(['/user']).then();
  }

  nameTask = ''
  descrTask = ''
  dateTask = ''


  save() {
    this.route.paramMap.subscribe(params => {
      const id:string | null = params.get('id');
      if (id){
        if(this.nameTask==='' || this.descrTask==='' || this.dateTask===''){
          alert("Все поля должны быть заполнены!!!");
        } else{
          const task:{id:number, taskName:string, taskDescr:string, taskDate: string, done:boolean} = {
            id: +id,
            taskName:this.nameTask,
            taskDescr: this.descrTask,
            taskDate:this.dateTask,
            done: false
          }
          changeTask(+id, task)
          this.router.navigate(['/user']).then();
        }
      }
    });
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id:string | null = params.get('id');
      if(id){
        const task =getTasks(+id)
        this.nameTask = task.taskName
        this.descrTask = task.taskDescr
        this.dateTask = task.taskDate
      }
    });
  }


}
