using RepositoryLayer;
using RepositoryLayer.DB;
using InfrastructureLayer;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ServiceLayer.Common;

namespace ServiceLayer
{
    public class UserService : IUserService<UserDM>
    {
        private readonly IUserRepo<tbl_User> _iUserRepo;
        public UserService(IUserRepo<tbl_User> iUserRepo)
        {
            _iUserRepo = iUserRepo;
        }

        public async Task<bool> AddAsync(UserDM dataDM,bool isSeller)
        {
            //Map data into model
            var obj = new tbl_User();         
            
            obj.email = dataDM.email;
            obj.first_name = dataDM.first_name;
            obj.last_name = dataDM.last_name;
            obj.mobile = dataDM.mobile;         
            obj.password = dataDM.password;
            obj.shop_name = dataDM.shop_name;
            
            var results = await _iUserRepo.Add(obj, isSeller);
            return results;

        }


        public async Task<UserDM> GetByIdAsync(long id)
        {


            tbl_User data = await _iUserRepo.GetbyID(id);
            UserDM UserObj = new UserDM();
            UserObj.email = data.email;
            UserObj.first_name = data.first_name;
            UserObj.last_name = data.last_name;
            UserObj.mobile = data.mobile;
            UserObj.password = data.password;
            UserObj.shop_name = data.shop_name;

            return UserObj;

        }
    }
}
