using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entity;

namespace MISA.DataLayer
{
    public class ItemDL:BaseDL
    {
        public IEnumerable<ItemsViewModel> GetItems()
        {
            var tableName = "View_Item";
            IEnumerable<ItemsViewModel> items = this.GetAllData<ItemsViewModel>(tableName);
            return items;
        }
    }
}
