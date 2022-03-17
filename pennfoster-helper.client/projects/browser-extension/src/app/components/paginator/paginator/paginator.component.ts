import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() pageMax = 1;
  @Input() pageCurrent = 1;
  @Output() pageCurrentChange = new EventEmitter<number>();

  get atFirstPage(): boolean {
    return this.pageCurrent == 1;
  }
  get atLastPage(): boolean {
    return this.pageCurrent == this.pageMax;
  }

  constructor() {}

  ngOnInit(): void {}

  next(): void {
    this.pageCurrent++;
    this.pageCurrentChange.emit(this.pageCurrent);
  }
  prev(): void {
    this.pageCurrent--;
    this.pageCurrentChange.emit(this.pageCurrent);
  }
}
