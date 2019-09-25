import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'introslider',
    pathMatch: 'full'
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
  },
  { path: 'edituseraddress', loadChildren: './edituseraddress/edituseraddress.module#EdituseraddressPageModule' },
  { path: 'addrestaurant', loadChildren: './addrestaurant/addrestaurant.module#AddrestaurantPageModule' },
  { path: 'successfullorder', loadChildren: './successfullorder/successfullorder.module#SuccessfullorderPageModule' },
  { path: 'timemanage', loadChildren: './timemanage/timemanage.module#TimemanagePageModule' },
  { path: 'addmenulist', loadChildren: './addmenulist/addmenulist.module#AddmenulistPageModule' },
  { path: 'managerestaurant', loadChildren: './managerestaurant/managerestaurant.module#ManagerestaurantPageModule' },
  { path: 'editrestaurantdetial', loadChildren: './editrestaurantdetial/editrestaurantdetial.module#EditrestaurantdetialPageModule' },
  { path: 'managemenulist', loadChildren: './managemenulist/managemenulist.module#ManagemenulistPageModule' },
  { path: 'manageorder', loadChildren: './manageorder/manageorder.module#ManageorderPageModule' },
  { path: 'clientorder/:manageorder', loadChildren: './clientorder/clientorder.module#ClientorderPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'multipleimageupload', loadChildren: './multipleimageupload/multipleimageupload.module#MultipleimageuploadPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
