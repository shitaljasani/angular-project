import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule, MatInputModule} from '@angular/material'
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent }    from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ItemComponent } from './item/item.component';
import { ManageItemComponent } from './item/manage-item/manage-item.component';
import { CompositeItemComponent } from './item/composite-item/composite-item.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuComponent } from './layout/menu/menu.component';
import { NewGroupsComponent } from './new-groups/new-groups.component';
import { TransferComponent } from './transfer/transfer.component';
import { WarehousesComponent } from './warehouses/warehouses.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashbordComponent,
    ItemComponent,
    ManageItemComponent,
    CompositeItemComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NewGroupsComponent,
    TransferComponent,
    WarehousesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
