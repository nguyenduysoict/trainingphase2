using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Commons
{
    public class DataFormater
    {
        public string convertToNvarchar(Guid id)
        {
            return "'" + id.ToString() + "'";
        }
    }
}
