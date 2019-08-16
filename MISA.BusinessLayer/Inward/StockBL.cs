using MISA.DataLayer;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BusinessLayer
{
    public class StockBL
    {
        private StockDL stockDL;

        public StockBL()
        {
            stockDL = new StockDL();
        }

        public IEnumerable<StockViewModel> GetStocks()
        {
            return stockDL.GetStocks();
        }
    }
}
