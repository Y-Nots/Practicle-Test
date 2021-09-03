import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import {Product_BackEnd} from 'src/app/shared/models/product'
declare var $: any;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productList:any;
  initial_productList:any;
  selectedProductId: any;
  ProductIsCollapse:boolean = true;
  currentPermission: any;
  search_text: string = '';

  onSearchChange(){
    if(this.search_text == ''){
      this.productList = this.initial_productList;
    }else{
      this.productList = this.initial_productList.filter(data => data.product_code == this.search_text || data.description == this.search_text);
    }
  }

  constructor(

    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductList(); 

    $("input[data-bootstrap-switch]").each(function(){
      $(this).bootstrapSwitch('state', $(this).prop('checked'));
    });
  }

  getProductList() {
    this.productService.getAllProducts().subscribe(data => {
      console.log({"Product List": data});
      this.productList = data; //set data
      this.initial_productList = data; //set data

      //Datatable
      $(function () {
        $('#producttbl').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": true,
          "ordering": true,
          "info": true,
          "autoWidth": false,
          "responsive": true,
        });
      });
      
    });
  }

  editProduct(list: any){
    console.log({"Edit Product" : list});
    this.router.navigate(['product/edit_product/', list.product_code]);
  }

  addProduct(){
    console.log("Add Product");
    this.router.navigate(['product/create_product/']);
  }



}
