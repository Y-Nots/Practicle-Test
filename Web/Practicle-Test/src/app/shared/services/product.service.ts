import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Product } from "../models/product";
// import { AuthService } from "./auth.service";
import { ToastrService } from "./toastr.service";
import { Observable, of,BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap,finalize } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AngularFireStorage } from "@angular/fire/storage";
import { Product_BackEnd, Product_FrontEnd,fileDetails } from 'src/app/shared/models/product';

@Injectable()
export class ProductService {
  products: AngularFireList<Product>;
  product: AngularFireObject<Product>;

  productObjectFrombackEnd: Product_BackEnd;
  productObjectFromFrontEnd: Product_FrontEnd;

  public productImageSubject: BehaviorSubject<fileDetails>;
  public productImage: Observable<fileDetails>;
  private readonly PRODUCT_IMAGE = 'PRODUCT_IMAGE';

  // favouriteProducts
  favouriteProducts: AngularFireList<FavouriteProduct>;
  cartProducts: AngularFireList<FavouriteProduct>;
  fb;
  constructor(
    private db: AngularFireDatabase,
    public http: HttpClient,
    private storage: AngularFireStorage,
    // private authService: AuthService,
    private toastrService: ToastrService
  ) {

    this.productImageSubject = new BehaviorSubject<fileDetails>(JSON.parse(localStorage.getItem(this.PRODUCT_IMAGE)));
    this.productImage = this.productImageSubject.asObservable();
  }

  getAllProducts() {
    return this.http.get<any>(API_URL + '/api/Products/');
  }


  postProduct(obj: Product_FrontEnd): Observable<any> {
    this.setProductObjectFromBackEnd(obj);
    var url = '/api/Products';
    var data = this.productObjectFrombackEnd;

    return this.http.post<any>(API_URL+url, data)
      .pipe(
        tap(tokens => ''),
        // mapTo(true),
        catchError(error => {
          
          return of(error.error);
        }));
  }

  setProductObjectFromBackEnd(obj: Product_FrontEnd){
    
    this.productObjectFrombackEnd = {
      category: obj.category,
      color: obj.color,
      description: obj.description,
      image_url: obj.image_url,
      make: obj.make,
      model: obj.model,
      price: obj.price,
      product_name: obj.product_name,
      quantity: obj.quantity,
      status: obj.status,
      stock_status: obj.stock_status,
      crated_date:obj.crated_date,
      created_by:obj.created_by,
      deleted_date:null
    }
  }
  setProductObjectFromFrontEnd(obj: Product_FrontEnd){
    
    return this.productObjectFrombackEnd = {
      category: obj.category,
      color: obj.color,
      description: obj.description,
      image_url: obj.image_url,
      make: obj.make,
      model: obj.model,
      price: obj.price,
      product_name: obj.product_name,
      quantity: obj.quantity,
      status: obj.status,
      stock_status: obj.stock_status,
      crated_date:obj.crated_date,
      created_by:obj.created_by,
      deleted_date:null
    }
  }

  updateProduct(obj: Product_FrontEnd, id: any): Observable<any> {
    this.setProductObjectFromBackEnd(obj);
    var url = '/api/Products?product_id='+id;
    var data = this.productObjectFrombackEnd;

    return this.http.put<any>(API_URL+url, data)
      .pipe(
        tap(tokens => ''),
        // mapTo(true),
        catchError(error => {
          
          return of(error.error);
        }));
  }
  deleteProduct(id: any) {
    return this.http.delete<any>(API_URL + '/api/Products?product_id=' + id);
  }

  getProductsById(id: any) {
    let params = new HttpParams().set('product_id', id);
    return this.http.get<any>(API_URL + '/api/Products/GetById/', { params });
  }

 // image upload
 selectedFile: File = null;
 downloadURL: Observable<string>;
 fileDetails: any = {
   "fileName": '',
   "fileUrl": '',
 }

  async onImageUpload(event) {

    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Products/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Products/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {

          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {

            if (url) {

              this.fb = url;
              this.fileDetails.fileName = event.target.files[0].name;
              this.fileDetails.fileUrl = url;

              localStorage.setItem(this.PRODUCT_IMAGE, JSON.stringify(this.fileDetails));
              this.productImageSubject.next(this.fileDetails);

            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {

        if (url) {
          console.log(url);
        }
      });
  }



  
  getProducts() {
    this.products = this.db.list("products");
    return this.products;
  }

  createProduct(data: Product, callback: () => void) {
    this.products.push(data);
    callback();
  }

  getProductById(key: string) {
    this.product = this.db.object("products/" + key);
    return this.product;
  }

  // updateProduct(data: Product) {
  //   this.products.update(data.$key, data);
  // }

  // deleteProduct(key: string) {
  //   this.products.remove(key);
  // }

  /*
   ----------  Favourite Product Function  ----------
  */

  // Get Favourite Product based on userId
  async getUsersFavouriteProduct() {
    // const user = await this.authService.user$.toPromise();
    // this.favouriteProducts = this.db.list("favouriteProducts", (ref) =>
    //   ref.orderByChild("userId").equalTo(user.$key)
    // );
    // return this.favouriteProducts;
    return new Promise((res, rej) => {
      res([]);
    });
  }

  // Adding New product to favourite if logged else to localStorage
  addFavouriteProduct(data: Product): void {
    const a: Product[] = JSON.parse(localStorage.getItem("avf_item")) || [];
    a.push(data);
    this.toastrService.wait("Adding Product", "Adding Product as Favourite");
    setTimeout(() => {
      localStorage.setItem("avf_item", JSON.stringify(a));
    }, 1500);
  }

  // Fetching unsigned users favourite proucts
  getLocalFavouriteProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avf_item")) || [];

    return products;
  }

  // Removing Favourite Product from Database
  removeFavourite(key: string) {
    this.favouriteProducts.remove(key);
  }

  // Removing Favourite Product from localStorage
  removeLocalFavourite(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avf_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avf_item", JSON.stringify(products));
  }

  /*
   ----------  Cart Product Function  ----------
  */

  // Adding new Product to cart db if logged in else localStorage
  addToCart(data: Product): void {
    const a: Product[] = JSON.parse(localStorage.getItem("avct_item")) || [];
    a.push(data);

    this.toastrService.wait(
      "Adding Product to Cart",
      "Product Adding to the cart"
    );
    setTimeout(() => {
      localStorage.setItem("avct_item", JSON.stringify(a));
    }, 500);
  }

  // Removing cart from local
  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }
}

export class FavouriteProduct {
  product: Product;
  productId: string;
  userId: string;
}
