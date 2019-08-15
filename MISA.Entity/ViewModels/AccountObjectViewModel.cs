using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Commons;

namespace MISA.Entity
{
    public class AccountObjectViewModel
    {
        public Guid AccountObjectID { get; set; }
        public string AccountObjectCode { get; set; }
        public int AccountObjectType { get; set; }
        public string TypeName
        {
            get
            {
                string TypeName;
                Enumeration.AccountObjectType accountObjType = (Enumeration.AccountObjectType)(this.AccountObjectType);
                switch (accountObjType)
                {
                    case Enumeration.AccountObjectType.Customer:
                        TypeName = "Khách hàng";
                        break;
                    case Enumeration.AccountObjectType.Employee:
                        TypeName = "Nhân viên";
                        break;
                    case Enumeration.AccountObjectType.Supplier:
                        TypeName = "Nhà cung cấp";
                        break;
                    default:
                        TypeName = "Không xác định";
                        break;
                }
                return TypeName;
            }
            set
            {
            }
        }
        public string AccountObjectName { get; set; }
    }
}
