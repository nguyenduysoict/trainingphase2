using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DataLayer
{
    public class StockDL:BaseDL
    {
        public IEnumerable<StockViewModel> GetStocks()
        {
            var tableName = "Stock";
            IEnumerable<StockViewModel> stocks = this.GetAllData<StockViewModel>(tableName);
            return stocks;
        }
    }
}
