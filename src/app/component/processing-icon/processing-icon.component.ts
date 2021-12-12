import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-processing',
  templateUrl: './processing-icon.component.html',
  styleUrls: ['./processing-icon.component.scss']
})
export class ProcessingIconComponent implements OnInit {
  @Input() showLoading: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
