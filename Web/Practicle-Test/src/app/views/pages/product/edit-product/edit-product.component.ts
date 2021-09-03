import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { ToastrService } from '../../../../shared/services/toastr.service';
import { ProductService } from 'src/app/shared/services/product.service';
declare var $: any
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  public ProductDetailsForm : FormGroup;
  productDetailsIsCollapse:boolean = true;
  product_id: any;
  categoryList = [];
  stockStatusList = [];
  categoryDummyList = [];
  stockStatusDummyList = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ProductService: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { 
      this.loadCategoryData();
      this.loadStockStatusData();
      this.product_id = this.route.snapshot.paramMap.get('id');
      this.loadProductDetails(this.product_id);
    }

  ngOnInit(): void {
    this.loadform();
    this.upSet();

        //Initialize Select2 Elements
        $('.select2').select2()

        //Initialize Select2 Elements
        $('.select2bs4').select2({
          theme: 'bootstrap4'
        })
  }
  loadform(){
    this.ProductDetailsForm = this.formBuilder.group({
      'product_name' : [''],
      'description' : [''],
      'quantity' : [''],
      'color' : [''],
      'make' : [''],
      'model' : [''],
      'image_url' : [''],
      'price' : [''],
      'status' : [''],
      'category' : [''],
      'stock_status' : [''],
      'created_by' : [''],
      'crated_date' : [''],
    });

  }

  onSubmit() {

    console.log({"data: ": this.ProductDetailsForm.value});
    if (this.ProductDetailsForm.invalid) {
      this.checked = true;
      this.toastr.warning('Please fill all required fields!','Warning');
    }
    if (!this.ProductDetailsForm.invalid) {
      this.checked = false;
      this.ProductService.updateProduct(this.ProductDetailsForm.getRawValue(), this.product_id).subscribe(data => {
        if (data.Success == true) {
          this.toastr.success(data.Message,'Success');
        }
        else{
          if(data.Message){
            this.toastr.error(data.Message,'Error');
          }else{
            this.toastr.error("Something went wrong, check your Connection.",'Error' );
          }
        }
      })

    }
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


  async loadProductDetails(id: any) {
    await this.ProductService.getProductsById(id).subscribe(data => {

      let product_details_from_BackEnd = this.ProductService.setProductObjectFromFrontEnd(data.product_details);

      this.ProductDetailsForm.patchValue(product_details_from_BackEnd);
      //this.setCheckboxValues();
    });
  }

  deleteProduct() {
    console.log({ "Delete Product: ": this.ProductDetailsForm.value });
    this.ProductService.deleteProduct(this.product_id).subscribe((data) => {

      this.toastr.success(data.Message,'Success');
      this.router.navigate(['products/']);
    })

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

  fileName: any = 'Choose file';
  uploadImage() {

  }

  pickFile(event) {
    this.ProductService.onImageUpload(event);

  }
      checked : boolean = false;

}
