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
        public IEnumerable<RefViewModel> GetRefs()
        {
            RefDL refDL = new RefDL();

            return refDL.GetRefs();
        }
    }
}
