import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})
export class CreateCustomerComponent implements OnInit {
  customerFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createCustomerForm();
  }

  createCustomerForm() {
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

  submitForm() {
    if (this.customerFormGroup.valid) {
      this.customerService
        .createCustomer(this.customerFormGroup.value)
        .subscribe({
          next: () => {
            console.log('Customer created successfully!');
            this.router.navigate(['/customers']);
          },
          error: (err) => {
            console.error('Error creating customer:', err);
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
