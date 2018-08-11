import { Routes } from '@angular/router';

import { RentalComponent } from './rental/rental.component';

const routes: Routes = [
  { path: '', redirectTo: '/rentals', pathMatch: 'full' },
];

export { routes };
