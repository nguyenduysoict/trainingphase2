using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class AccountObject: Base
    {
        public Guid AccountObjectID { get; set; }
        public string AccountObjectCode  { get; set; }
        public int AccountObjectType { get; set; }
        public string AccountObjectName { get; set; }

    }
}
