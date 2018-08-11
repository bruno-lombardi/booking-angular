import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';


@Injectable()
export class RentalService {

  private rentals: Rental[] = [
    {
      id: '1',
      title: 'Central Apartment',
      city: 'New York',
      street: 'Times Sqaure',
      category: 'apartment',
      image: 'https://picsum.photos/400/600',
      bedrooms: 3,
      description: 'Very nice apartment',
      dailyRate: 34,
      shared: false,
      createdAt: '24/12/2017'
    },
    {
      id: '2',
      title: 'Central Apartment 2',
      city: 'San Francisco',
      street: 'Main street',
      category: 'condo',
      image: 'https://picsum.photos/400/600',
      bedrooms: 2,
      description: 'Very nice apartment',
      dailyRate: 12,
      shared: true,
      createdAt: '24/12/2017'
    },
    {
      id: '3',
      title: 'Central Apartment 3',
      city: 'Bratislava',
      street: 'Hlavna',
      category: 'condo',
      image: 'https://picsum.photos/400/600',
      bedrooms: 2,
      description: 'Very nice apartment',
      dailyRate: 334,
      shared: true,
      createdAt: '24/12/2017'
    },
    {
      id: '4',
      title: 'Central Apartment 4',
      city: 'Berlin',
      street: 'Haupt strasse',
      category: 'house',
      image: 'https://picsum.photos/400/600',
      bedrooms: 9,
      description: 'Very nice apartment',
      dailyRate: 33,
      shared: true,
      createdAt: '24/12/2017'
    }
  ];

  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable((observer) => {
      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => rental.id === rentalId);
        observer.next(foundRental);
      }, 1000);
    });
  }

  public getRentals(): Observable<Rental[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.rentals);
      }, 500);

      setTimeout(() => {
        observer.error('Error while fetching rentals');
      }, 4000);
    });
  }
}
