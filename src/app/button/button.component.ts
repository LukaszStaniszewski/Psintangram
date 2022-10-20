import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() url: string | undefined;
  @Input() text: string | null | undefined;

  constructor() {}

  ngOnInit(): void {
    console.log(this.url);
  }
}
