import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'introslider',
    pathMatch: 'prefix'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'introslider', loadChildren: './introslider/introslider.module#IntrosliderPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forgot', loadChildren: './forgot/forgot.module#ForgotPageModule' },
  { path: 'mailmsg', loadChildren: './mailmsg/mailmsg.module#MailmsgPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'registeraddress', loadChildren: './registeraddress/registeraddress.module#RegisteraddressPageModule' },
  { path: 'restaurantprofile/:respro', loadChildren: './restaurantprofile/restaurantprofile.module#RestaurantprofilePageModule' },
  { path: 'restaurantmenu/:resmenu', loadChildren: './restaurantmenu/restaurantmenu.module#RestaurantmenuPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  {
    path: 'userprofile', loadChildren: './userprofile/userprofile.module#UserprofilePageModule'
  },
  { path: 'edituserprofile', loadChildren: './edituserprofile/edituserprofile.module#EdituserprofilePageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
