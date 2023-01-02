import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,

],
exports: [
  HeaderComponent,
 SidebarComponent,
 FooterComponent,

],
imports: [
 CommonModule,
  RouterModule
]
})
export class SharedModule { }
