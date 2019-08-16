using MISA.DataLayer;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BusinessLayer
{
    public class ItemBL
    {
        private ItemDL itemDL;

        public ItemBL()
        {
            itemDL = new ItemDL();
        }
        public IEnumerable<ItemsViewModel> GetItems()
        {
            return itemDL.GetItems();

        }
    }
}
