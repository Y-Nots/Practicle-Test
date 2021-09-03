using InfrastructureLayer;
using RepositoryLayer;
using RepositoryLayer.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class ProductService : IProductService<ProductDM>
    {
        private readonly IProductRepo<tbl_Product> _iProductRepo;
        public ProductService(IProductRepo<tbl_Product> iProductRepo)
        {
            _iProductRepo = iProductRepo;
        }
        public async Task<bool> AddAsync(ProductDM dataDM)
        {
            var obj = new tbl_Product();
            obj.color = dataDM.color;
            obj.created_by = dataDM.created_by;
            obj.description = dataDM.description;
            obj.image_url = dataDM.image_url;
            obj.crated_date = DateTime.UtcNow;
            obj.make = dataDM.make;
            obj.model = dataDM.model;
            obj.price = dataDM.price;
            obj.product_name = dataDM.product_name;
            obj.quantity = dataDM.quantity;
            obj.qty_reserved = 0;
            obj.status = ProductStatus.NEW.ToString();
            obj.category = dataDM.category;
            obj.stock_status = dataDM.quantity > 0 ? StockStatus.IN_STOCK.ToString() : StockStatus.OUT_OF_STOCK.ToString();
            var results = await _iProductRepo.Add(obj);
            return results;

        }

        public async Task<bool> DeleteAsync(int id)
        {
            var results = await _iProductRepo.Delete(id);
            return results;
        }

        public async Task<List<ProductDM>> GetAllAsync(int? userId)
        {
            List<tbl_Product> datatList = await _iProductRepo.GetAll(userId);

            List<ProductDM> Productg_List = new List<ProductDM>();
            Productg_List = datatList.Select(data => new ProductDM()
            {
                color = data.color,
                created_by = data.created_by,
                description = data.description,
                image_url = data.image_url,
                model = data.model,
                make = data.make,
                price = data.price,
                category = data.category,
                product_id = data.product_id,
                product_name = data.product_name,
                quantity = data.quantity,
                qty_reserved = data.qty_reserved,
                deleted_date = data.deleted_date
            }).ToList();
            return Productg_List;
        }

        public async Task<ProductDM> GetByIdAsync(long id)
        {
            tbl_Product data = await _iProductRepo.GetbyID(id);
            ProductDM ProductObj = new ProductDM();

            var obj = new tbl_Product();
            ProductObj.color = data.color;
            ProductObj.created_by = data.created_by;
            ProductObj.description = data.description;
            ProductObj.image_url = data.image_url;
            ProductObj.model = data.model;
            ProductObj.make = data.make;
            ProductObj.price = data.price;
            ProductObj.stock_status = ((int)(data.quantity - data.qty_reserved) > 0 || data.stock_status == StockStatus.IN_STOCK.ToString()) ? StockStatus.IN_STOCK.ToString() : StockStatus.OUT_OF_STOCK.ToString();
            ProductObj.product_id = data.product_id;
            ProductObj.product_name = data.product_name;
            ProductObj.quantity = (int)(data.quantity - data.qty_reserved);
            ProductObj.qty_reserved = data.qty_reserved;
            ProductObj.deleted_date = data.deleted_date;

            return ProductObj;
        }

        public async Task<bool> UpdateAsync(ProductDM dataDM, int id)
        {
            var obj = new tbl_Product();
            obj.price = dataDM.price;
            obj.model = dataDM.model;
            obj.stock_status = dataDM.stock_status;
            var results = await _iProductRepo.Update(obj, id);
            return results;
        }
    }
}
