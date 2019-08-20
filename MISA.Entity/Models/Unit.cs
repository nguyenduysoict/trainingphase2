using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class Unit:Base
    {
        public Guid UnitID { get; set; }
        public string UnitName { get; set; }
    }
}
