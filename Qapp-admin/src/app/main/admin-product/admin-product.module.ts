import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderingComponent } from './ordering/ordering.component';
import { SellingComponent } from './selling/selling.component';
import { ControlComponent } from './control/control.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    OrderingComponent,
    SellingComponent,
    ControlComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'control',
        component: ControlComponent,
      },
    ]),
  ]
})
export class AdminProductModule { }
