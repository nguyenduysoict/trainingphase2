﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entity;

namespace MISA.DataLayer
{
    public class RefDetailDL:BaseDL
    {
        public IEnumerable<RefDetailViewModel> GetRefDetailById(Guid id)
        {
            var tableName = "View_RefDetail";
            var columnName = "RefID";
            IEnumerable<RefDetailViewModel> refDetails = this.GetDataById<RefDetailViewModel>(tableName, columnName, id);
            return refDetails;
        }

        public int InsertRefDetail(RefDetail refDetail)
        {
            var storedProcedure = "Proc_InsertRefDetail";
            var result = -1;
            result = this.InsertEntity<RefDetail>(storedProcedure, refDetail);
            return result;
        }
    }
}
