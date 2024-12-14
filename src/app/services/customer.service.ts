import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }

  getCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.httpClient.get<ICustomer>(
      `https://jsonplaceholder.typicode.com/users/${customer.id}`
    );
  }

  createCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.httpClient.post<ICustomer>(
      'https://jsonplaceholder.typicode.com/users',
      customer
    );
  }

  editCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.httpClient.put<ICustomer>(
      `https://jsonplaceholder.typicode.com/users/${customer.id}`,
      customer
    );
  }

  deleteCustomer(customerId: string | number): Observable<ICustomer> {
    return this.httpClient.delete<ICustomer>(
      `https://jsonplaceholder.typicode.com/users/${customerId}`
    );
  }
}
