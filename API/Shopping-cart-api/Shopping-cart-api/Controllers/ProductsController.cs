using InfrastructureLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Shopping_cart_api.Controllers
{
    [Produces(MediaTypeNames.Application.Json)]
    [Route("api/Products")]
    [ApiController]
    public class ProductsController : Controller
    {
        private readonly IProductService<ProductDM> _productService;

        public ProductsController(IProductService<ProductDM> productService)
        {
            _productService = productService;
        }


        /// <summary>
        /// Get all Products
        /// </summary>
        /// <remarks>
        /// Get all Products
        /// </remarks>
        /// <returns></returns> 
        // GET: api/Products
        [HttpGet]
        public JsonResult GetAll(int? userId)
        {
            try
            {
                var data = _productService.GetAllAsync(userId);
                if (data != null)
                {
                    return Json(new { success = true, status_code = 200, data });
                }
                else
                {
                    return Json(new { success = true, message = "No Products found!", all_Products = data });
                }
            }
            catch (Exception)
            {
                return Json(new { success = false, status_code = 400, message = "An error occured while retrieving the Products." });
            }
        }


        /// <summary>
        /// Get Product by ProductId
        /// </summary>
        /// <remarks>
        /// Get the details of Product by ProductId
        /// </remarks>
        /// <returns></returns> 
        // GET: api/Products
        [HttpGet("GetById/{Id}")]
        public JsonResult GetByID(long id)
        {
            try
            {
                if (id == null)
                {
                    return Json(new { success = true, message = "No Product found!" });
                }

                var data = _productService.GetByIdAsync(id);
                if (data != null)
                {
                    return Json(new { success = true, status_code = 200, data });
                }
                else
                {
                    return Json(new { success = true, message = "No Product found!", all_Products = data });
                }
            }
            catch (Exception)
            {
                return Json(new { success = false, status_code = 400, message = "An error occured while retrieving the Product." });
            }

        }

        /// <summary>
        /// Add a new Product
        /// </summary>
        /// <remarks>
        /// Create a new Product with the relevant details
        /// </remarks>
        /// <returns></returns>
        // POST: api/Products
        [Authorize(Roles = "Seller")]
        [HttpPost]
        public JsonResult Create(ProductDM Product_Obj)
        {
            try
            {
                var result = _productService.AddAsync(Product_Obj);
                if (result != null)
                {
                    if (result.Result==false)
                    {
                        return Json(new { success = false, status_code = 400, message = "An error occured while creating the Products." });
                    }
                    else
                    {
                        return Json(new { success = true, status_code = 200, result });
                    }

                }
                else
                {
                    return Json(new { success = true, message = "No Products found!", all_Products = result });
                }
            }
            catch (Exception)
            {
                return Json(new { success = false, status_code = 400, message = "An error occured while creating the Products." });
            }
        }

        /// <summary>
        ///  Update a Product
        /// </summary>
        /// <remarks>
        /// Update a Product with the relevant details
        /// </remarks>
        /// <returns></returns>
        // POST: api/Products
        [Authorize(Roles = "Seller")]
        [HttpPut]
        public JsonResult Update(ProductDM Product_Obj, int id)
        {
            try
            {
                var result = _productService.UpdateAsync(Product_Obj, id);
                if (result != null)
                {
                    if (result.Result == false)
                    {
                        if (result.Result == false)
                        {
                            return Json(new { success = false, status_code = 400, message = "An error occured while updating the Products." });
                        }
                        else
                        {
                            return Json(new { success = true, status_code = 200, result });
                        }
                    }
                    else
                    {
                        return Json(new { success = true, status_code = 200, result });
                    }

                   
                }
                else
                {
                    return Json(new { success = true, message = "No Products found!", all_Products = result });
                }
            }
            catch (Exception)
            {
                return Json(new { success = false, status_code = 400, message = "An error occured while updating the Products." });
            }
        }

        /// <summary>
        ///  Delete a Product
        /// </summary>
        /// <remarks>
        /// Delete a Product with the relevant details
        /// </remarks>
        /// <returns></returns>
        // POST: api/Products
        [Authorize(Roles = "Seller")]
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            try
            {
                var result = _productService.DeleteAsync(id);
                if (result != null)
                {
                    if (result.Result == false)
                    {
                        return Json(new { success = false, status_code = 400, message = "An error occured while deleting the Products." });
                    }
                    else
                    {
                        return Json(new { success = true, status_code = 200, result });
                    }
                    
                }
                else
                {
                    return Json(new { success = true, message = "No Products found!", all_Products = result });
                }
            }
            catch (Exception)
            {
                return Json(new { success = false, status_code = 400, message = "An error occured while deleting the Products." });
            }
        }

    }
}
