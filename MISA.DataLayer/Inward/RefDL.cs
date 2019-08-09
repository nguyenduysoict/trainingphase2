using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using MISA.Entity;

namespace MISA.DataLayer
{
    public class RefDL:BaseDL
    {
        public IEnumerable<RefViewModel> GetRefs()
        {
            var tableName = "View_Ref";
            IEnumerable<RefViewModel> refs = this.GetAllData<RefViewModel>(tableName);
            return refs;
        }

        

    }
}
