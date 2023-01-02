import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageAllComponent } from './manage-all/manage-all.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ManageAllComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    // BrowserModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: 'all',
        component: ManageAllComponent,
      },
    ]),
  ]
})
export class UserModule { }
