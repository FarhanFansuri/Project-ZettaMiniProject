import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { SourceService } from '../shared/source.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, OnChanges {

  constructor(private ss: SourceService) { }
  data: any[] = [];
  get: any;
  getData: any = new SubSink();
  ngOnInit(): void {
    this.getData = this.ss.getTransaction().subscribe((data) => {
      this.get = data.data.GetAllTransactions.data;
      this.data = this.get;
      console.log(this.data)
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("changes")
  }
  update() {
    this.getData = this.ss.getTransaction().subscribe((data) => {
      this.get = data.data.GetAllTransactions.data;
      this.data = this.get;
    })
  }

}
