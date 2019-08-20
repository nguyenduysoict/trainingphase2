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
        #region properties

        private RefDL refDL;
        #endregion
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        public RefBL()
        {
            refDL = new RefDL(); 
        }
        /// <summary>
        /// Lấy phiếu thu
        /// </summary>
        /// <returns></returns>
        public IEnumerable<RefViewModel> GetRefs()
        {
            return refDL.GetRefs();
        }

        /// <summary>
        /// Lấy phiếu thu theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<Ref> GetRefById(Guid id)
        {
            return refDL.GetRefById(id);
        }

        /// <summary>
        /// Thêm mới phiếu thu
        /// </summary>
        /// <param name="refSaveData"></param>
        /// <returns></returns>
        public int AddNewRef(RefSaveData refSaveData)
        {
            var refNo = refSaveData.Ref.RefNo;
            var result = -1;
            if(refDL.CheckExistedRef(refNo) == "")
            {
                var newRefID = refDL.AddNewRef(refSaveData.Ref);
                if(newRefID == "")
                {
                    return -1;
                } else
                {
                    var refDetailDL = new RefDetailDL();
                    for (int i = 0; i < refSaveData.RefDetail.Length; i++)
                    {
                        refSaveData.RefDetail[i].RefID = Guid.Parse(newRefID);
                        result += refDetailDL.InsertRefDetail(refSaveData.RefDetail[i]);
                    }
                }
            } else
            {
                return -1;
            }
            return result;
            
        }


        public int UpdateRef(Ref @ref)
        {
            return refDL.UpdateRef(@ref);
        }
    }
}
