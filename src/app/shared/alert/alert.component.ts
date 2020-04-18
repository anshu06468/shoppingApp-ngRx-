import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }
  @Input() message:string;
  @Output() error=new EventEmitter<void>();
  ngOnInit() {
  }

  close(){
    this.error.emit();
  }
}
