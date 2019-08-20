using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class Stock:Base
    {
        public Guid StockID { get; set; }
        public string StockName { get; set; }
    }
}
