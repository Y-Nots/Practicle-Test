﻿using System;
using System.Collections.Generic;
using System.Text;

namespace InfrastructureLayer
{
    public class UserDM
    {
        public int user_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string mobile { get; set; }
        public string shop_name { get; set; }
    }
}
