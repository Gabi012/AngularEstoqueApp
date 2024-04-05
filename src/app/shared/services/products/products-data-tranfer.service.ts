import { GetAllProductsResponse } from './../../../models/interface/products/response/GetAllProductsResponse';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTranferService {

  public productsDataEmmiter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null)
  public productsDatas: Array<GetAllProductsResponse> = [];

  setProductsDatas(products: Array<GetAllProductsResponse>) : void {
    if(products){
      this.productsDataEmmiter$.next(products)
      this.getProductsDatas();
    }
  }
  getProductsDatas() {
    this.productsDataEmmiter$.pipe(
      take(1),
      map((data) => data?.filter((product) => product.amount > 0))
    ).subscribe({
      next: (respose) =>{
        if(respose){
          this.productsDatas = respose;
        }
      }
    });
    return this.productsDatas;
  }

}
