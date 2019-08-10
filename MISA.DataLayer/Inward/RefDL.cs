using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using MISA.Entity;
using System.Collections;

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

        public string GetRefID(string refCode)
        {
            using(DataAccess dataAccess = new DataAccess())
            {
                var param = new Hashtable();
                param.Add("RefID", refCode);
            }

            return "";
        } 

    }
}
