import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {ProductService} from './product.service';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    Ng2SmartTableModule
  ],
  providers: [ProductService],
  declarations: [ProductListComponent, ProductDetailComponent]
})
export class ProductsModule { }
