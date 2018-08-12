import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

import { RentalService } from './shared/rental.service';

import { routes } from './rental.routing';

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    RentalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule
  ],
  providers: [RentalService]
})
export class RentalModule {}
