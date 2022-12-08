import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SourceService } from 'src/app/shared/source.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private ss: SourceService, private router: Router) { }


  cart: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required)
  });
  data: any = this.ss.data_cart;
  getSub: any = new SubSink();
  data_recipe: any[] = [];
  catatan: any = "";
  amount: number = 0;
  checkout: boolean = false;
  ngOnInit(): void {
    this.getSub.sink = this.ss.getMenu().subscribe((data) => {
      this.data_recipe = data.data.GetAllRecipes.data_recipes;
    })
    if (this.data.length > 0) {
      this.checkout = true
    } else {
      this.checkout = false
    }

  }

  onChangeView() {
    console.log("cahnge")
  }

  add(id: any) {
    this.ss.data_cart.forEach(element => {
      if (element.recipe_id == id) {
        element.amount += 1
      }
    });


  }

  sub(id: any) {
    this.ss.data_cart.forEach(element => {
      if (element.recipe_id == id) {
        element.amount -= 1
      }
    });

  }
  checkOut() {
    this.ss.data_cart.forEach((data) => {
      this.ss.orderNow(data)
    })
    this.ss.data_cart = [];
    this.data = []
    Swal.fire(
      'Hore!!',
      'Order berhasil!',
      'success'
    )
    this.router.navigate(['/menu'])
  }

  getRecipeName(id: any): any {
    var name = ""
    this.data_recipe.forEach((element: any) => {
      if (element.id == id) {
        name = element.recipe_name;
      }
    });
    return name;
  }
  getRecipePrice(id: any): any {
    var data = ""
    this.data_recipe.forEach((element: any) => {
      if (element.id == id) {
        data = element.price;
      }
    });
    return data;
  }



}
