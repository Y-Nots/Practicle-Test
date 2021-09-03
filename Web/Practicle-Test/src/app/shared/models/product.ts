export class Product {
  $key: string;
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  productAdded: number;
  productQuatity: number;
  ratings: number;
  favourite: boolean;
  productSeller: string;
}

export class Product_BackEnd 
{
  product_name: string;
  description: string;
  quantity: number;
  color: string;
  make: string;
  model: string;
  image_url: string;
  price: string;
  status: string;
  category: string;
  stock_status: string;
  created_by: number;
  crated_date: Date;
  deleted_date: Date;
}
export class Product_FrontEnd
{
  product_name: string;
  description: string;
  quantity: number;
  color: string;
  make: string;
  model: string;
  image_url: string;
  price: string;
  status: string;
  category: string;
  stock_status: string;
  created_by: number;
  crated_date: Date;
  deleted_date: Date;
}

export interface fileDetails {
  fileName: String;
  fileUrl: String;

}