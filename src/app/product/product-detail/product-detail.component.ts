import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ProductService } from "../shared/product.service"


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product:any

  constructor(
  private route:ActivatedRoute,
  private productService: ProductService
  ) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const productsObservable = this.productService.getProductById(params.get("productId")!)
    productsObservable.subscribe(
      (data) => { 
      this.product = data
       },
      (err) => { console.error("エラー") },
      () => { console.log("完了しました!") }
    )
    }
  )
  }
}
