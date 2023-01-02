import { MainComponent } from './main.component';
import { Routes } from '@angular/router';
import { ControlComponent } from './admin-product/control/control.component';
// 



export const MainRoutes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: '', component: ControlComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'admin-product',
        loadChildren: () =>
          import('./admin-product/admin-product.module').then((m) => m.AdminProductModule),
      },
      
      // {
      //   path: 'admin-product',
      //   loadChildren: () =>
      //     import('./admin-product/admin-product.module').then((m) => m.AdminProductModule)        
      // }
      // {
      //   path: 'control',
      //   loadChildren: () =>
      //     import('./admin-product/control/control.component').then((m) => m.ControlComponent)        
      // },
    ]
  }
];
