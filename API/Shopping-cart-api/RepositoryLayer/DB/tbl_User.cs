using System;
using System.Collections.Generic;

#nullable disable

namespace RepositoryLayer.DB
{
    public partial class tbl_User
    {
        public int user_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string mobile { get; set; }
        public string shop_name { get; set; }
        public string Identity_userId { get; set; }
    }
}
