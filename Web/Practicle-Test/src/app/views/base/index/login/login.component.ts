import { ToastrService } from "../../../../shared/services/toastr.service";
import { NgForm, EmailValidator,FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../../../shared/services/user.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { UserDetails } from "../../../../shared/models/user";
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [EmailValidator],
})
export class LoginComponent implements OnInit {
  user = {
    emailId: "",
    loginPassword: "",
  };

  public loginForm : FormGroup;
  public registerSellerDetailsForm : FormGroup;
  public registerBuyerDetailsForm : FormGroup;
  workshopDetailsIsCollapse:boolean = true;
  currentUser: UserDetails;

  errorInUserCreate = false;
  errorMessage: any;
  createUser;

  constructor(
     private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //this.authService.currentUserSubject.subscribe(data => this.currentUser = data);
    
  }

  ngOnInit() {

    this.loadloginform();
    this.loadSellersignform();
    this.loadBuyersignform();
  }

  loadloginform(){
    this.loginForm = this.formBuilder.group({
      'email' : ['', Validators.required],
      'password' : ['', Validators.required],
    });

  }


  loadSellersignform(){
    this.registerSellerDetailsForm = this.formBuilder.group({
      'shop_name' : [''],
      'email' : [''],
      'mobile' : [''],
      'password' : [''],
      'is_seller' : true,
    });

  }

  loadBuyersignform(){
    this.registerBuyerDetailsForm = this.formBuilder.group({
      'first_name' : ['', Validators.required],
      'last_name' : [''],
      'email' : [''],
      'mobile' : [''],
      'password' : [''],
      'is_seller' : false,
    });

  }

  // onSignInSubmit() {
  //   this.authService.login(
  //     {
  //       email: this.loginForm.controls['email'].value,
  //       password: this.loginForm.controls['password'].value
  //     }
  //   )
  //   .subscribe(success => {
  //     if (success == true) {
  //     }
  //     else{
  //       this.toastr.error("invalid Credentials", "Error");
  //     }
  //   });
  // }

  onSignInSubmit() {
debugger
    this.authService.login(this.loginForm.getRawValue()).subscribe(data => {
      debugger
      if (data == true) {
        this.toastr.success(data.Message, "Success");
      }
      else{
        debugger
        if(data.Message){
          this.toastr.error(data.Message, "Error");
        }else{
          this.toastr.error("Something went wrong, check your Connection.", "Error" );
        }
      }
    })



    // this.authService.login(
    //   {
    //     email: this.loginForm.controls['email'].value,
    //     password: this.loginForm.controls['password'].value
    //   }
    // )
    // .subscribe(success => {
    //   if (success == true) {
    //   }
    //   else{
    //     this.toastr.error("invalid Credentials", "Error");
    //   }
    // });
  }

  onSignupSeller() {
    console.log({"data: ": this.registerSellerDetailsForm.value});
    if (this.registerSellerDetailsForm.invalid) {
      this.toastr.warning('Please fill all required fields!', "Warning");
    }
    if (!this.registerSellerDetailsForm.invalid) {
      this.userService.postSeller(this.registerSellerDetailsForm.getRawValue(),true).subscribe(data => {
        
        if (data.success == true) {
          this.toastr.success(data.Message, "Success");
              $("#createSellerForm").modal("hide");
        }
        else{
          debugger
          if(data.Message){
            this.toastr.error(data.Message, "Error");
            $("#createSellerForm").modal("show");
          }else{
            this.toastr.error("Something went wrong, check your Connection.", "Error" );
          }
        }
      })

    }
  }

  onSignupBuyer() {
    console.log({"data: ": this.registerBuyerDetailsForm.value});
    if (this.registerBuyerDetailsForm.invalid) {
      this.toastr.warning('Please fill all required fields!', "Warning");
    }
    if (!this.registerSellerDetailsForm.invalid) {
      this.userService.postBuyer(this.registerBuyerDetailsForm.getRawValue(),false).subscribe(data => {
        if (data.Success == true) {
          console.log(data);
          this.toastr.success(data.Message, "Success");
              $("#createSellerForm").modal("hide");
        }
        else{
          console.log(data)
          if(data.Message){
            this.toastr.error(data.Message, "Error");
          }else{
            this.toastr.error("Something went wrong, check your Connection.", "Error" );
          }
        }
      })

    }
  }

  resetForm(){
    //this.registerForm.reset();
    this.loginForm.reset();
  }

}
