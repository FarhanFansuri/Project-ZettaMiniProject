import { Observable, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SourceService {
  data_cart: any[] = [];
  recipe_id_cart: any[] = [];
  idOrder: any;
  constructor(private apollo: Apollo) { }

  addData(id: string, amount: number, note: string) {
    this.data_cart.push({
      recipe_id: id,
      amount: amount,
      note: note
    })
  }

  addCart(data: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        addCart(
          input:{
            recipe_id: "${data.recipe_id}"
            amount: ${data.amount}
            note:"${data.note}"
          }
        ){
          id
        }
      }`
    }).pipe(map((data: any) => {
      return data.data.addCart.id
    }))
  }

  orderNow(data: any) {

    this.addCart(data).subscribe((dat) => {
      this.idOrder = dat;
      console.log(dat)
      this.apollo.mutate({
        mutation: gql`
        mutation{
          OrderNow(
            id: "${dat}"
          ){
            id
          }
        }
        `
      }).pipe(map((data: any) => {
        return data
      })).subscribe((d) => {
        console.log(d);
      })
    })
  }

  addCartNote(id: string, note: string) {
    this.data_cart.forEach(element => {
      if (element.recipe_id == id) {
        element.note = note;
      }
    });
  }

  addTransaction(data: { recipe_id: string, amount: number, note: string }[]) {
    data.forEach(element => {
      this.apollo.mutate({
        mutation: gql`

        `
      })
    });

  }
  subTransaction() {
    return this.apollo.mutate({
      mutation: gql`

      `
    })
  }
  getMenu(): Observable<any> {

    return this.apollo.query({
      query: gql`
      query{
        GetAllRecipes(
          status:"active"
          ){
          data_recipes
          {
            id
            recipe_name
            price
            description
            status
            image
          }
        }
      }
      `
    }).pipe(map((data) => {
      return data
    }))

  }

  getCart(): Observable<any> {

    return this.apollo.query({
      query: gql`
      query{
        GetAllRecipes(
          status:"active"
          ){
          data_recipes
          {
            id
            recipe_name
            price
            description
            status
            image
          }
        }
      }
      `
    }).pipe(map((data) => {
      return data
    }))
  }
  getOrder(): Observable<any> {

    return this.apollo.query({
      query: gql`
        query{
          GetAllRecipes(
            status:"active"
            ){
            data_recipes
            {
              id
              recipe_name
              price
              description
              status
              image
            }
          }
        }
        `
    }).pipe(map((data) => {
      return data
    }))

  }
  getTransaction(): Observable<any> {

    return this.apollo.watchQuery({
      query: gql`
      query{
        GetAllTransactions(
          order_status:"success"
          limit:6
        ){
          data{
            order_date
            total_price
            menu{
              note
              recipe_id{
                recipe_name
              }
              amount
            }

          }
        }
      }
      `
    }).valueChanges

  }

}


