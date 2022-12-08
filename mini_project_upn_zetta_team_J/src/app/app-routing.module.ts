import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: 'full'
  }
  ,
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),],

  exports: [RouterModule]
})
export class AppRoutingModule { }
