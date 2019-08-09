using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entity;
using MISA.DataLayer;
namespace MISA.BusinessLayer.Inward
{
    class RefDetailBL
    {
        public IEnumerable<RefDetailViewModel> GetRefDetailById(string id)
        {
            RefDetailDL refDetailDL = new RefDetailDL();
            return refDetailDL.GetRefDetailById(id);
        }
    }
}
