using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entity;
using MISA.DataLayer;


namespace MISA.BusinessLayer
{
    public class RefDetailBL
    {
        public IEnumerable<RefDetailViewModel> GetRefDetailById(Guid id)
        {
            RefDetailDL refDetailDL = new RefDetailDL();
            return refDetailDL.GetRefDetailById(id);
        }
    }
}
