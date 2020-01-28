import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ManageItemComponent } from './item/manage-item/manage-item.component';
import { CompositeItemComponent } from './item/composite-item/composite-item.component';
import { NewGroupsComponent } from './new-groups/new-groups.component';
import { TransferComponent } from './transfer/transfer.component';
import { WarehousesComponent } from './warehouses/warehouses.component';

const routes: Routes = [
  { path: 'LoginScreen', component: LoginComponent },
  { path: 'DashbordScreen', component: DashbordComponent },
  { path: 'ManageItemScreen', component: ManageItemComponent },
  { path: 'CompositeItem', component: CompositeItemComponent },
  { path: 'ItemGroups', component: NewGroupsComponent },
  { path: 'Transfer', component: TransferComponent },
  { path: 'Warehouses', component: WarehousesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
