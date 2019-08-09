using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class RefDetailViewModel
    {
        public Guid RefDetailID { get; set; }
        public Guid RefID { get; set; }
        public string SKUCode { get; set; }

        public string ItemName { get; set; }
        public Guid ItemID { get; set; }
        public decimal UnitPrice { get; set; }

        public Guid UnitID { get; set; }
        public Guid StockID { get; set; }

        public int Quantity { get; set; }
        public string UnitName { get; set; }
        public string StockName { get; set; }
    }
}
