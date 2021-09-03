using InfrastructureLayer;
using Microsoft.AspNetCore.Mvc;
using RepositoryLayer.DB;
using ServiceLayer;
using ServiceLayer.Common;
using Shopping_cart_api.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Shopping_cart_api.Controllers
{
    [Produces(MediaTypeNames.Application.Json)]
    [Route("api/Users")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService<UserDM> _userService;

        public UserController(IUserService<UserDM> userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get  User by UserId
        /// </summary>
        /// <remarks>
        /// Get the details of User by UserId
        /// </remarks>
        /// <returns></returns> 
        // GET: api/Users
        [HttpGet("GetById/{Id}")]
        public JsonResult GetByemail (long id)
        {
            try
            {
                if (id == null)
                {
                    return Json(new { success = true, message = "No User found!" });
                }

                var data = _userService.GetByIdAsync(id);
                if (data != null)
                {
                    return Json(new { success = true, status_code = 200, data });
                }
                else
                {
                    return Json(new { success = true, message = "No User found!", all_Users = data });
                }
            }
            catch (Exception)
            {
                return Json(new { success = false, status_code = 400, message = "An error occured while retrieving the Users." });
            }

        }

        /// <summary>
        /// Get selected employee
        /// </summary>
        /// <remarks>
        /// Get the details of a particular User role using the User Email
        /// </remarks>
        /// <param name="email">Refers to the User Email</param>
        /// <returns></returns>
        // GET: api/Users
        [HttpGet("GetRolebyEmail")]
        public JsonResult GetRolebyEmail(string email)
        {
            try
            {
                using (ShoppingCartContext _context = new ShoppingCartContext())
                {
                    var user = _context.tbl_Users.Where(e => e.email == email).FirstOrDefault();
                    if (user == null)
                        return Json(new { success = false, status_code = 404, message = "Retrieve failed! user does not exist." });

                    else
                    {
                        var RoleId = _context.AspNetUsers.Join(_context.AspNetUserRoles, user => user.Id, role => role.UserId, (user, role) => new { user, role }).Where(e => e.user.Email == email).Select(a => a.role.RoleId).FirstOrDefault();

                        var role = _context.AspNetRoles.Where(t => t.Id == RoleId).Select(e => e.Name).FirstOrDefault();

                        if (role == null)
                        {
                            return Json(new { success = false, status_code = 404, message = "Retrieve failed! user does not exist." });
                        }
                        else
                        {
                            return Json(new
                            {
                                user = new
                                {
                                    user.email,
                                    user.first_name,
                                    user.last_name,
                                    user.mobile,
                                    user.password,
                                    user.shop_name,
                                    user.user_id,
                                    user.Identity_userId,
                                    role
                                }
                            });
                        }

                    }


                }
            }
            catch (Exception)
            {
                return Json(new { success = false, status_code = 400, message = "An error occured while retrieving the employee." });
            }
        }

        /// <summary>
        /// Add a new User
        /// </summary>
        /// <remarks>
        /// Create a new User with the relevant details
        /// </remarks>
        /// <returns></returns>
        /// POST: api/Users
        [HttpPost]
        public JsonResult Create(UserDM User_Obj,bool isSeller)
        {
            try
            {
                // Validate contact number
                if (User_Obj.mobile==null && !CommonUtilities.getInstance().ValidateContactNumber(User_Obj.mobile))
                    return Json(new { success = false, status_code = 400, message = "Received invalid contact number!" });

                // Validate email
                if (User_Obj.email==null && !CommonUtilities.getInstance().ValidateEmail(User_Obj.email))
                    return Json(new { success = false, status_code = 400, message = "Received invalid email!" });


                var result = _userService.AddAsync(User_Obj, isSeller);

                if (result != null)
                {
                    if (result.Result==true)
                    {
                        return Json(new { success = true, status_code = 200, result });
                    }
                    else
                    {
                        return Json(new { success = false, status_code = 400, message = "An error occured while creating the Users." });

                    }

                }
                
                else
                {
                    return Json(new { success = true, message = "No Users found!", all_Users = result });
                }
            }
            catch (Exception)
            {
                return Json(new { success = false, status_code = 400, message = "An error occured while creating the Users." });
            }
        }


    }
}
