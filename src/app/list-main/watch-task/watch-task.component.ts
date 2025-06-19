import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getTasks } from '../../shared/data';

interface Task {
  id: number;
  taskName: string;
  taskDate: string;
  taskDescr: string;
  done: boolean;
}

@Component({
  selector: 'app-watch-task',
  standalone: false,
  templateUrl: './watch-task.component.html',
  styleUrl: './watch-task.component.scss'
})
export class WatchTaskComponent {
  task: Task | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.task = getTasks(id);
      }
    });
  }

  close(): void {
    this.router.navigate(['/user']).then();
  }
}
