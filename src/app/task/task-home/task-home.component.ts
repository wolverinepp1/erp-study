import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {
  MdDialog
} from '@angular/material';
import {
  NewTaskComponent
} from '../new-task/new-task.component';
import {
  CopyTaskComponent
} from '../copy-task/copy-task.component';
import {
  ConfimDialogComponent
} from '../../shared/confim-dialog/confim-dialog.component';
import {
  NewTaskListComponent
} from '../new-task-list/new-task-list.component';
import {
  slideToRight
} from '../../anims/router.anim';
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {
  lists = [{
    id: 1,
    name: 'ToDo',
    order: 1,
    tasks: [{
      id: 1,
      desc: 'Task 1：Eating',
      completed: true,
      priority: 3,
      owner: {
        id: 1,
        name: 'Threevs',
        avatar: 'avatar:svg-3'
      },
      dueDate: new Date()
    },
    {
      id: 1,
      desc: 'Task 1：Aston sent an email to ...',
      completed: false,
      priority: 2,
      owner: {
        id: 1,
        name: 'Wang',
        avatar: 'avatar:svg-6'
      },
      dueDate: new Date()
    },
    ]
  },
  {
    id: 2,
    name: 'Doing',
    order: 2,
    tasks: [{
      id: 1,
      desc: 'Task 1：Wake up',
      completed: false,
      reminder: true,
      priority: 2,
      owner: {
        id: 1,
        name: 'Vicent',
        avatar: 'avatar:svg-4'
      },
      dueDate: new Date()
    },
    {
      id: 1,
      desc: 'Task 2：Facebook something',
      completed: false,
      priority: 1,
      owner: {
        id: 1,
        name: 'Wang',
        avatar: 'avatar:svg-8'
      },
      dueDate: new Date()
    },
    ]
  },
  {
    id: 3,
    name: 'Done',
    order: 3,
    tasks: [{
      id: 1,
      desc: 'Task 1：Drink',
      completed: false,
      reminder: false,
      priority: 3,
      owner: {
        id: 1,
        name: 'Vincent',
        avatar: 'avatar:svg-11'
      },
      dueDate: new Date()
    },
    {
      id: 1,
      desc: 'Take 1：dfadfaxcbbxcvb',
      completed: false,
      priority: 1,
      owner: {
        id: 1,
        name: 'Vicent',
        avatar: 'avatar:svg-7'
      },
      dueDate: new Date()
    },
    ]
  }
  ];
  constructor(private dialog: MdDialog) { }
  @HostBinding('@routeAnim') state;
  ngOnInit() { }
  onNewTask() {
    const openDialog = this.dialog.open(NewTaskComponent, {
      data: {
        title: 'New Task'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  onItemClick(item) {
    const openDialog = this.dialog.open(NewTaskComponent, {
      data: {
        title: 'Modify Task',
        item: item
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  onMoveAll(header) {
    const openDialog = this.dialog.open(CopyTaskComponent, {
      data: {
        lists: this.lists.filter(item => item.name != header),
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  headerDelete() {
    const openDialog = this.dialog.open(ConfimDialogComponent, {
      data: {
        title: 'Are you sure to delete?'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  newTaskList() {
    const openDialog = this.dialog.open(NewTaskListComponent, {
      data: {
        title: 'New List'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  changeListNames(list) {
    const openDialog = this.dialog.open(NewTaskListComponent, {
      data: {
        title: 'Modify list name'
      }
    });
    openDialog.afterClosed().subscribe(result => {
      result ? list.name = result : null;
      console.log(result);
    });
  }
  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handing item');
        break;
      case 'task-list':
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }
  getInpData(data) {
    console.log(data);
  }
}
