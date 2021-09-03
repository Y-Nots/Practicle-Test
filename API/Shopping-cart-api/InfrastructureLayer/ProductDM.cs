using System;
using System.Collections.Generic;
using System.Text;

namespace InfrastructureLayer
{
    public class ProductDM
    {
        public int product_id { get; set; }
        public string product_name { get; set; }
        public string description { get; set; }
        public int? quantity { get; set; }
        public int qty_on_hand { get; set; }
        public int? qty_reserved { get; set; }
        public string color { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public string category { get; set; }
        public string stock_status { get; set; }     
        public string image_url { get; set; }
        public decimal? price { get; set; }
        public int? created_by { get; set; }
        public DateTime? crated_date { get; set; }
        public DateTime? deleted_date { get; set; }
    }
}
