import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  products:any

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    const productsObservable = this.productService.getProducts()
    productsObservable.subscribe(
      (data) => { 
        this.products = data
        },
      (err) => { console.error("エラー") },
      () => { console.log("完了しました!") }
    )
  }
}



