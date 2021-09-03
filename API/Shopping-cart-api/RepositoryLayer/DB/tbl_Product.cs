using System;
using System.Collections.Generic;

#nullable disable

namespace RepositoryLayer.DB
{
    public partial class tbl_Product
    {
        public int product_id { get; set; }
        public string product_name { get; set; }
        public string description { get; set; }
        public int? quantity { get; set; }
        public int? qty_reserved { get; set; }
        public string color { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public string image_url { get; set; }
        public decimal? price { get; set; }
        public string status { get; set; }
        public string category { get; set; }
        public string stock_status { get; set; }
        public int? created_by { get; set; }
        public DateTime? crated_date { get; set; }
        public DateTime? deleted_date { get; set; }
    }
}
