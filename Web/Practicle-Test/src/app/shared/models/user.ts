export class User {
  $key: string;
  user_id: string;
  userName: string;
  emailId: string;
  password: string;
  phoneNumber: string;
  createdOn?: string;
  isAdmin: boolean;
  avatar?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  shop_name: string;
  role:string;
}

export class UserDetails
{
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  shop_name: string;
  role:string;
  password: string;
  Identity_userId:string;
}
export class LoginBackEnd
{
Username:string;
password:string;
}

export class LoginFrontEnd
{
email:string;
password:string;
}

export class UserDetail {
  $key: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailId: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  zip: number;
}
export class Seller_BackEnd
{
  email: string;
  mobile: string;
  shop_name: string;
  password: string;
  is_seller:boolean;

}
export class Seller_FrontEnd
{
  email: string;
  mobile: string;
  shop_name: string;
  password: string;
  is_seller:boolean;

}
export class Buyer_BackEnd
{
  email: string;
  mobile: string;
  first_name: string;
  last_name: string;
  password: string;
  is_seller:boolean;

}
export class Buyer_FrontEnd
{
  email: string;
  mobile: string;
  first_name: string;
  last_name: string;
  password: string;
  is_seller:boolean;

}
