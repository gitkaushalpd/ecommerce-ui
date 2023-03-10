import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Product } from "../common/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) {}

  //Map the JSON data from Spring data Rest to Product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    // @TODO: need to build URL based on category id ...
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
