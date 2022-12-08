import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Component, OnInit } from '@angular/core';
// import { SourceService } from 'src/app/shared/source.service';
import { of, map, switchMap, Observable } from 'rxjs';
import { SourceService } from '../../shared/source.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private ss: SourceService, private router: Router) { }
  private getsub = new SubSink();
  data: any;
  ngOnInit(): void {
    this.getsub.sink = this.ss.getMenu().subscribe((data) => {
      this.data = data.data.GetAllRecipes.data_recipes;
    })
  }

  addToCart(id: any) {
    this.ss.addData(id, 1, "");
    this.router.navigate(['/cart'])
  }

}
