import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from '../../../../shared/services/toastr.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { fileDetails } from 'src/app/shared/models/product';
declare var $: any
enum PRODUCT_STATUS {
  OPEN ,
  DELETED 
}


enum STOCK_STATUS {
  IN_STOCK ,
  OUT_OF_STOCK 
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  public ProductDetailsForm : FormGroup;
  productDetailsIsCollapse:boolean = true;
  categoryList = [];
  stockStatusList = [];
  categoryDummyList = [];
  stockStatusDummyList = [];
  fileDetails: fileDetails;
  
  constructor(    
    private formBuilder: FormBuilder,
    private ProductService: ProductService,
    private toastr: ToastrService) {

    this.loadCategoryData();
    this.loadStockStatusData();
     }

  ngOnInit(): void {
    this.loadform();
    this.upSet();

       this.ProductService.productImageSubject.subscribe(data => this.fileDetails = data);
        //Initialize Select2 Elements
        $('.select2').select2()

        //Initialize Select2 Elements
        $('.select2bs4').select2({
          theme: 'bootstrap4'
        })
  }
  loadform(){
    this.ProductDetailsForm = this.formBuilder.group({
      'product_name' : ['', Validators.required],
      'description' : ['', Validators.required],
      'quantity' : ['', Validators.required],
      'color' : ['', Validators.required],
      'make' : ['', Validators.required],
      'model' : ['', Validators.required],
      'image_url' : ['', Validators.required],
      'price' : ['', Validators.required],
      'status' : [1],
      'category' : ['', Validators.required],
      'stock_status' : [1],
      'created_by' : [''],
      'crated_date' : [''],
    });

  }

  loadCategoryData(){
this.categoryDummyList = [
{
  "category_id":1,
  "category":"Mobile Phones"
},
{
  "category_id":2,
  "category":"Headsets"
},
{
  "category_id":3,
  "category":"Vegitables"
},
{
  "category_id":4,
  "category":"Food"
}
    ]

    this.categoryDummyList.find(data => {
      this.categoryList = data.map(item => {
        const obj = {};
        obj["id"] = item.category_id;
        obj["name"] = item.category;
        return obj;
      });

    });

    
  }

  loadStockStatusData(){
    this.stockStatusDummyList = [
    {
      "Status_id":1,
      "stock_status":"In Stock"
    },
    {
      "Status_id":2,
      "stock_status":"Out Of Stock"
    }
        ]

        this.stockStatusDummyList.find(data => {
          this.stockStatusList = data.map(item => {
            const obj = {};
            obj["id"] = item.Status_id;
            obj["name"] = item.stock_status;
            return obj;
          });
    
        });
        
      }


     // UI arrow change in collapse lable
     cd_up: boolean = true;
  
     upSet(){
       this.cd_up = true;
     }
   
     arrowChange(row: string){
       switch (row){
         case 'cd':{
           if(this.cd_up){
             this.cd_up = false;
           }else if(!this.cd_up){
             this.cd_up = true
           }
           this.productDetailsIsCollapse = !this.productDetailsIsCollapse;
           return 0;
         };
 
       }
     }
     checked : boolean = false;

     onSubmit() {

      console.log({"data: ": this.ProductDetailsForm.value});
      if (this.ProductDetailsForm.invalid) {
        this.checked = true;
        this.toastr.warning('Please fill all required fields!',"Warning");
      }
      if (!this.ProductDetailsForm.invalid) {
        this.checked = false;
        this.ProductService.postProduct(this.ProductDetailsForm.getRawValue()).subscribe(data => {
          if (data.Success == true) {
            this.toastr.success(data.Message,"Success");
            this.ProductDetailsForm.reset();
          }
          else{
            if(data.Message){
              this.toastr.error(data.Message,"Error");
            }else{
              this.toastr.error("Something went wrong, check your Connection.","Error" );
            }
          }
        })
 
      }
    }

    fileName: any = 'Choose file';
    uploadImage() {
  
    }
  
    pickFile(event) {
      this.ProductService.onImageUpload(event);
  
    }
}
