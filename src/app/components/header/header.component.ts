import {Product} from "../../models/Product";
import {CartService} from "../../services/cart.service";
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  pageTitle: string = 'My Shop';
  cartProductList!: Product[];
  faCart = faCartShopping;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartProductList = this.cartService.getCartProduct();
    this.calculate(this.cartProductList);
  }

  calculate(cart: Product[]) {
    let sum = 0;
    cart.forEach((item) => {
      sum += Number(item.amount);
    });
    const ele = document.getElementById('cartAmount') as HTMLElement;
    ele.innerHTML = sum.toString();
  }
}
