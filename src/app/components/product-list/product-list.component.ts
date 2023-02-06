import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {Subject, takeUntil} from "rxjs";
import {ProductService} from "../../services/product.service";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  title: string = 'Product List';
  products: Product[] = [];
  private ngUnsubscribe = new Subject<void>();
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService
      .getProduct()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: Product[]) => {
          this.products = res;
        },
        error: (err: Error) => console.log(err),
      });
  }
}
