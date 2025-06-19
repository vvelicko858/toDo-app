import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchTaskComponent } from './watch-task.component';

describe('WatchTaskComponent', () => {
  let component: WatchTaskComponent;
  let fixture: ComponentFixture<WatchTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
