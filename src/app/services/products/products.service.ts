import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interface/products/response/GetAllProductsResponse';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = enviroment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
   private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer: ${this.JWT_TOKEN}`,
    }),
   }
  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllProducts(): Observable<Array<GetAllProductsResponse>>
  {
      return this.http.get<Array<GetAllProductsResponse>>
            (`${this.API_URL}/products`, this.httpOptions)
            .pipe(
                map((product) => product.filter((data)=> data.amount > 0))
            )

  }

}
