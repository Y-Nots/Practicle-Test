using InfrastructureLayer;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public class ProductsRepo : IProductRepo<tbl_Product>
    {
        private readonly ShoppingCartContext _context;
        public ProductsRepo(ShoppingCartContext context)
        {
            _context = context;
        }
        public async Task<bool> Add(tbl_Product data)
        {
            try
            {
                await _context.tbl_Products.AddAsync(data);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var data = new tbl_Product { product_id = id };
                data.deleted_date = DateTime.UtcNow;
                data.status = ProductStatus.DELETED.ToString();
                _context.Entry(data).Property("deleted_date").IsModified = true;
                _context.Entry(data).Property("status").IsModified = true;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<tbl_Product>> GetAll(int? userId)
        {
            List<tbl_Product> TblProduct_List = new List<tbl_Product>();
            TblProduct_List = await _context.tbl_Products.ToListAsync();
            List<tbl_Product> results = new List<tbl_Product>();

            if (userId!=null)
            {
                //remove data flaged as deleted 
                 results = TblProduct_List.Where(t => t.status != ProductStatus.DELETED.ToString()).ToList();
            }
            else
            {
                //remove data flaged as deleted and filter by seller
                results = TblProduct_List.Where(t => t.status != ProductStatus.DELETED.ToString() && t.created_by== userId).ToList();
            }

            return results;
        }

        public async Task<tbl_Product> GetbyID(long id)
        {
            var results = await _context.tbl_Products.Where(t => t.product_id == id).FirstOrDefaultAsync();
            return results;
        }

        public async Task<bool> Update(tbl_Product data, int id)
        {
            try
            {
                data = new tbl_Product { product_id = id };
                _context.tbl_Products.Update(data);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
