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
        public IEnumerable<RefDetailViewModel> GetRefDetailById(string id)
        {
            var tableName = "View_RefDetail";
            IEnumerable<RefDetailViewModel> refDetails = this.GetDataById<RefDetailViewModel>(tableName, id);
            return refDetails;
        }
    }
}
