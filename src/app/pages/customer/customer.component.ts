import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../interfaces/customer';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  customer!: ICustomer;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const customer: ICustomer = { id: Number(id) } as ICustomer;

      this.onGetCustomer(customer);
    }
  }

  onGetCustomer(customer: ICustomer) {
    this.customerService.getCustomer(customer).subscribe((customer) => {
      this.customer = customer;
    });
  }

  deleteCustomer() {
    if (this.customer.id) {
      this.customerService.deleteCustomer(this.customer.id).subscribe({
        next: () => {
          console.log('Customer deleted successfully');
          this.router.navigate(['/customers']);
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
        },
      });
    } else {
      console.error('No active customer');
    }
  }
}
