﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class ItemsViewModel
    {
        public Guid ItemID { get; set; }
        public string SKUCode { get; set; }
        public string ItemName { get; set; }
        public decimal UnitPrice { get; set; }
        public Guid UnitID { get; set; }
        public string UnitName { get; set; }
    }
}
