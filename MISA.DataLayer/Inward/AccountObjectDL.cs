using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DataLayer
{
    public class AccountObjectDL:BaseDL
    {
        public IEnumerable<AccountObjectViewModel> GetAccountObjects()
        {
            var tableName = "AccountObject";
            IEnumerable<AccountObjectViewModel> accountObjects = this.GetAllData<AccountObjectViewModel>(tableName);
            return accountObjects;
        }

    }
}
