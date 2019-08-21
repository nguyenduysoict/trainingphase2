using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entity;

namespace MISA.DataLayer
{
    public class RefDetailDL:BaseDL
    {
        public IEnumerable<RefDetailViewModel> GetRefDetailById(Guid id)
        {
            var tableName = "View_RefDetail";
            var columnName = "RefID";
            return GetDataById<RefDetailViewModel>(tableName, columnName, id);
        }

        public int InsertRefDetail(RefDetail refDetail)
        {
            var storedProcedure = "Proc_InsertRefDetail";
            return InsertEntity<RefDetail>(storedProcedure, refDetail);
        }
    }
}
