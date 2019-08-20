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
        #region properties
        private RefDetailDL refDetailDL;
        #endregion

        public RefDetailBL()
        {
            refDetailDL = new RefDetailDL();
        }
        public IEnumerable<RefDetailViewModel> GetRefDetailById(Guid id)
        {
            return refDetailDL.GetRefDetailById(id);
        }

        public int InsertRefDetail(RefDetail refDetail)
        {
            return refDetailDL.InsertRefDetail(refDetail);
        }
    }
}
