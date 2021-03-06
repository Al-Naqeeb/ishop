import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products : any ;
  filteredProducts: any ;
  subscription: Subscription;
  constructor(private productService: ProductService) {
  this.subscription = this.productService.getAll().subscribe((products) => {
    this.filteredProducts = this.products  = products;
    });
   }

   ngOnDestroy(){
    this.subscription.unsubscribe();
   }
  ngOnInit(): void {
  }
  filter(query:string){
    this.filteredProducts = (query) ?
    this.products.filter((p:any) => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;
  }

}
