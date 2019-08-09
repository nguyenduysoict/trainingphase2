using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Commons
{
    public class AjaxResult
    {
        public AjaxResult()
        {

        }

        #region properties
        // Trạng thái Kết quả trả về 
        public bool Success { get; set; }
        // Thông báo về phía người dùng
        public string Message { get; set; }
        // Dữ liệu trả về
        public object Data { get; set; }

        #endregion
    }
}
