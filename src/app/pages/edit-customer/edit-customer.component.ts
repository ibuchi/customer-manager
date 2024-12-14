import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../interfaces/customer';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css',
})
export class EditCustomerComponent implements OnInit {
  customerFormGroup!: FormGroup;
  customer!: ICustomer;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.customer = { id: Number(id) } as ICustomer;
    }

    this.editCustomerForm();

    this.loadCustomerData();
  }

  editCustomerForm() {
    this.customerFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      website: [''],
      address: this.formBuilder.group({
        suite: ['', [Validators.required]],
        street: [''],
        city: ['', [Validators.required]],
        zipCode: [''],
        geo: this.formBuilder.group({
          longitude: [''],
          latitude: [''],
        }),
      }),
      company: this.formBuilder.group({
        name: ['', [Validators.required]],
        catchPhrase: [''],
        bs: [''],
      }),
    });
  }

  loadCustomerData() {
    this.customerService.getCustomer(this.customer).subscribe((customer) => {
      this.customerFormGroup.patchValue({
        id: customer.id,
        name: customer.name,
        username: customer.username,
        email: customer.email,
        phone: customer.phone,
        website: customer.website,
        company: {
          name: customer.company.name,
          catchPhrase: customer.company.catchPhrase,
          bs: customer.company.bs,
        },
        address: {
          street: customer.address.street,
          suite: customer.address.suite,
          city: customer.address.city,
          zipCode: customer.address.zipcode,
          geo: {
            longitude: customer.address.geo.lng,
            latitude: customer.address.geo.lat,
          },
        },
      });
    });
  }

  submitForm() {
    if (this.customerFormGroup.valid) {
      this.customerService
        .editCustomer(this.customer)
        .subscribe({
          next: () => {
            console.log('Customer updated successfully!');
            this.router.navigate(['/customers']);
          },
          error: (err) => {
            console.error('Error updating customer:', err);
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
