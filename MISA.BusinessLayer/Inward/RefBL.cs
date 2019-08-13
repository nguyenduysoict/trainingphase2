using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DataLayer;
using MISA.Entity;

namespace MISA.BusinessLayer
{
    public class RefBL
    {
        private RefDL refDL;

        public RefBL()
        {
            refDL = new RefDL(); 
        }
        public IEnumerable<RefViewModel> GetRefs()
        {
            return refDL.GetRefs();
        }
        public IEnumerable<Ref> GetRefById(Guid id)
        {
            return refDL.GetRefById(id);
        }


        public int AddNewRef(Ref @ref)
        {
            return refDL.AddNewRef(@ref);
        }
        public int UpdateRef(Ref @ref)
        {
            return refDL.UpdateRef(@ref);
        }
    }
}
