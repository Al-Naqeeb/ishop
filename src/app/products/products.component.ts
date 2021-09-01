import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products : any = [];
  filteredProducts:any;
  category : any;
  
  constructor(
    private route : ActivatedRoute,
    private productService : ProductService, 
    ) {
    productService
    .getAll()
    .pipe(switchMap(products => {
       this.products = products;
       return route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts =(this.category)?
        this.products.filter((p:any) => p.payload.val().category === this.category):
        this.products;
      });
   }
}
