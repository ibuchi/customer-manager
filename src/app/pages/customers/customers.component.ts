import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../interfaces/customer';

export interface customerElement {
  name: string;
  position: number;
  email: string;
  phoneNumber: number;
  gender: string;
}

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'address'];

  dataSource!: ICustomer[];
  filteredDataSource!: ICustomer[];
  searchQuery: string = '';

  constructor(private customerService: CustomerService) {}
  ngOnInit(): void {
    this.onGetCustomers();
  }

  onSearch(query: string): void {
    this.filteredDataSource = this.dataSource.filter((customer) =>
      Object.values(customer).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  onGetCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.dataSource = customers;
      this.filteredDataSource = [...this.dataSource];
    });
  }
}
