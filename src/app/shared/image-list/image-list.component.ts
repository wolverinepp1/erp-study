import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms'

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListComponent),
      multi: true
    }
  ]
})
export class ImageListComponent implements ControlValueAccessor {
  private propagateChange = (_: any) => { };
  @Input() items = [];
  @Input() title = 'Select';
  @Input() cols = 8;
  @Input() useSvgIcon = false;
  @Output() changeImage = new EventEmitter()
  selected = null;
  toggleTitle = 'Use Photo';
  constructor() { }
  ngOnInit(): void {
    if (!this.useSvgIcon) {
      this.onChange({ checked: !this.useSvgIcon })
    }
  }
  onChoose(index) {
    this.selected = this.items[index];
    this.propagateChange(index)  // 参数即为向外发送的值，用来作为form表单数据
  }
  writeValue(obj: any): void {
    this.selected = obj;
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  };

  registerOnTouched(fn: any): void { };

  validate(c: FormControl) {
    return this.selected ? null : { key: 'Formgroup creat failed' }
  }
  onChange(e) {
    this.selected = null;
    this.changeImage.emit(e);
    e.checked ? this.toggleTitle = 'Use icon' : this.toggleTitle = 'Use photo';
  }
}
