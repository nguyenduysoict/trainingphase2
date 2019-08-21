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
        /// Sinh số chứng từ mới
        /// </summary>
        /// <returns></returns>
        public string GetRefNo()
        {
            return refDL.GetRefNo();
        }

        /// <summary>
        /// Thêm mới phiếu thu
        /// </summary>
        /// <param name="refSaveData"></param>
        /// <returns></returns>
        public int InsertRef(RefSaveData refSaveData)
        {
            var refNo = refSaveData.Ref.RefNo;
            var result = 0;
            if(refDL.CheckExistedRef(refNo) == "")
            {
                var refID = Guid.NewGuid();
                refSaveData.Ref.RefID = refID;
                if(refDL.InsertRef(refSaveData.Ref) == 1)
                {
                    var refDetailDL = new RefDetailDL();
                    for (int i = 0; i < refSaveData.RefDetail.Length; i++)
                    {
                        refSaveData.RefDetail[i].RefID = refID;
                        result += refDetailDL.InsertRefDetail(refSaveData.RefDetail[i]);
                    }
                } else
                {
                    return 0;
                }
            } else
            {
                return 0;
            }
            return result;
            
        }


        public int UpdateRef(Ref @ref)
        {
            return refDL.UpdateRef(@ref);
        }
    }
}
