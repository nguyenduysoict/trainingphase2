using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    public class Ref: Base
    {
        public Guid RefID { get; set; }

        public string RefNo { get; set; }

        public int RefTypeID { get; set; }

        public DateTime RefDate { get; set; }

        public Guid? AccountObjectID { get; set; }

        public string JournalMemo { get; set; }

        public decimal TotalAmount { get; set; }

    }
}
