import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MD_DIALOG_DATA,
  MdDialogRef
} from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  priorities = [{
    label: 'Urgent',
    value: 1
  }, {
    label: 'Important',
    value: 2
  }, {
    label: 'Ordinary',
    value: 3
  }];
  dialogDatas;
  title = '';
  constructor(
    @Inject(MD_DIALOG_DATA) private dialogdata,
    private dialogref: MdDialogRef < NewTaskComponent >
  ) {}

  ngOnInit() {
    this.dialogDatas = this.dialogdata;
    this.title = this.dialogDatas.title;
  }
  save(which) {
    which ? this.dialogref.close({
      reData: 'new'
    }) : this.dialogref.close()
  }
}
