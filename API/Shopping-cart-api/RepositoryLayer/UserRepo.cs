using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RepositoryLayer.DB;
using RepositoryLayer.Log;
using Shopping_cart_api.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public class UserRepo : IUserRepo<tbl_User>
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        private readonly ShoppingCartContext _context;
        public UserRepo(ShoppingCartContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task<bool> Add(tbl_User userdata,bool isSeller)
        {
            try
            {
                if (isSeller)
                {
                    var userExists = await userManager.FindByNameAsync(userdata.email);
                    if (userExists != null)
                    {
                        Library.WriteErrorLog("User repository create Seller - - " + "User already exists!");
                        return false;
                    }
                        

                    ApplicationUser user = new ApplicationUser()
                    {
                        Email = userdata.email,
                        SecurityStamp = Guid.NewGuid().ToString(),
                        UserName = userdata.email
                    };
                    var result = await userManager.CreateAsync(user, userdata.password);
                    if (!result.Succeeded)
                    {
                        Library.WriteErrorLog("User repository create Buyer - - " + "Seller creation failed! Please check user details and try again.");
                        return false;
                    }

                    if (!await roleManager.RoleExistsAsync(UserRoles.Seller))
                        await roleManager.CreateAsync(new IdentityRole(UserRoles.Seller));
                    if (!await roleManager.RoleExistsAsync(UserRoles.Buyer))
                        await roleManager.CreateAsync(new IdentityRole(UserRoles.Buyer));

                    if (await roleManager.RoleExistsAsync(UserRoles.Seller))
                    {
                        await userManager.AddToRoleAsync(user, UserRoles.Seller);
                    }

                    userdata.Identity_userId = user.Id;
                    await _context.tbl_Users.AddAsync(userdata);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    var userExists = await userManager.FindByNameAsync(userdata.email);
                    if (userExists != null)
                    {
                        Library.WriteErrorLog("User repository create Buyer - - " + "User already exists!");
                        return false;
                    }


                    ApplicationUser user = new ApplicationUser()
                    {
                        Email = userdata.email,
                        SecurityStamp = Guid.NewGuid().ToString(),
                        UserName = userdata.email
                    };
                    var result = await userManager.CreateAsync(user, userdata.password);
                    if (!result.Succeeded)
                    {
                        Library.WriteErrorLog("User repository create Buyer - - " + "User creation failed! Please check user details and try again.");
                        return false;
                    }
                    else
                    {
                        if (!await roleManager.RoleExistsAsync(UserRoles.Seller))
                            await roleManager.CreateAsync(new IdentityRole(UserRoles.Seller));
                        if (!await roleManager.RoleExistsAsync(UserRoles.Buyer))
                            await roleManager.CreateAsync(new IdentityRole(UserRoles.Buyer));

                        if (await roleManager.RoleExistsAsync(UserRoles.Buyer))
                        {
                            await userManager.AddToRoleAsync(user, UserRoles.Buyer);
                        }

                        userdata.Identity_userId = user.Id;
                        await _context.tbl_Users.AddAsync(userdata);
                        await _context.SaveChangesAsync();
                        return true;
                    }
                }
                

            }
            catch (Exception ex)
            {
                Library.WriteErrorLog("User repository create User - - " + ex.Message.ToString());
                return false;
            }


        }

        public async Task<tbl_User> GetbyID(long id)
        {
            var results = await _context.tbl_Users.Where(t => t.user_id == id).FirstOrDefaultAsync();
            return results;
        }

    }
}
