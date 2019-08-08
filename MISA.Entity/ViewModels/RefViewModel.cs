using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class RefViewModel
    {
        public Guid RefID { get; set; }
        public string RefNo { get; set; }

        public DateTime RefDate { get; set; }

        public string RefHour { get; set; }

        public Guid AccountObjectID { get; set; }

        public string AccountObjectCode { get; set; }

        public int AccountObjectType { get; set; }

        public string AccountObjectName { get; set; }

        public decimal TotalAmount { get; set; }

        public string JournalMemo { get; set; }

        public int RefTypeID { get; set; }

        public string RefTypeName { get; set; }
    }
}
