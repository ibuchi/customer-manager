import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';
import { CustomerComponent } from './pages/customer/customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full',
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'customers/:id',
    component: CustomerComponent,
  },
  {
    path: 'create-customer',
    component: CreateCustomerComponent,
  },
  {
    path: 'customers/:id/edit',
    component: EditCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
