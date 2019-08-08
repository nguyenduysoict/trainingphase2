using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    class RefDetail: Base
    {
        public Guid RefDetailID { get; set; }
        public Guid RefID { get; set; }
        public Guid ItemID { get; set; }
        public Guid UnitID { get; set; }
        public Guid StockID { get; set; }
        public decimal UnitPrice {get; set; }
        public int Quantity { get; set; }
    }
}
