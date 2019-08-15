using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DataLayer;
using MISA.Entity;

namespace MISA.BusinessLayer
{
    public class AccountObjectBL
    {
        private AccountObjectDL accountObjectDL;

        public AccountObjectBL()
        {
            accountObjectDL = new AccountObjectDL();
        }
        public IEnumerable<AccountObjectViewModel> GetAccountObjects()
        {
            return accountObjectDL.GetAccountObjects();

        }
    }
}
