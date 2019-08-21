using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using MISA.Entity;
using System.Collections;

namespace MISA.DataLayer
{
    public class RefDL:BaseDL
    {
        /// <summary>
        /// Lấy danh sách chứng từ
        /// </summary>
        /// <returns></returns>
        public IEnumerable<RefViewModel> GetRefs()
        {
            var tableName = "View_Ref";
            IEnumerable<RefViewModel> refs = this.GetAllData<RefViewModel>(tableName);
            return refs;
        }

        /// <summary>
        /// Kiểm tra chứng từ có trong database
        /// </summary>
        /// <param name="refNo"></param>
        /// <returns></returns>
        public string CheckExistedRef(string refNo)
        {
            using(DataAccess dataAccess = new DataAccess())
            {
                var param = new Hashtable();
                param.Add("RefNo", refNo);
                var data = dataAccess.ExecuteScalar("Proc_GetRefByRefNo", param);
                string result;

                if(data == null)
                {
                    result = "";
                } else
                {
                    result = data.ToString();
                }
                return result;
            }
        }

        /// <summary>
        /// Lấy chứng từ theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        public IEnumerable<Ref> GetRefById(Guid id)
        {
            var tableName = "Ref";
            var columnName = "RefID";
            IEnumerable<Ref> @ref = this.GetDataById<Ref>(tableName,columnName,id);
            return @ref;
        }

        /// <summary>
        /// Thêm mới chứng từ vào database
        /// </summary>
        /// <param name="ref"></param>
        /// <returns></returns>

        public int InsertRef(Ref @ref) {
            var result = -1;
            var storedProcedure = "Proc_InsertRef";
            result = this.InsertEntity<Ref>(storedProcedure, @ref);
            return result;
        }

        /// <summary>
        /// Sinh số chứng từ
        /// </summary>
        /// <returns></returns>
        public string GetRefNo()
        {
            using(DataAccess dataAccess = new DataAccess())
            {
                var storedProcedure = "Proc_GetRefNo";
                var result = dataAccess.ExecuteScalar(storedProcedure);
                string data;
                if (result == null)
                {
                    data = "";
                } else
                {
                    data = result.ToString();
                }
                return data;
            }
        }

        public int UpdateRef(Ref @ref)
        {
            int result = 0;
            string connectionString = @"Data Source=DATABASE\SQL2014;Initial Catalog=MISA.Phase2;Integrated Security=True";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = "[dbo].[Proc_UpdateRef]";
            sqlConnection.Open();
            SqlCommandBuilder.DeriveParameters(sqlCommand);
            var sqlParameter = sqlCommand.Parameters;
            for (int i = 1; i < sqlParameter.Count; i++)
            {
                var parameterName = sqlParameter[i].ParameterName.Replace("@", string.Empty);
                var property = @ref.GetType().GetProperty(parameterName);
                if(property != null)
                {
                    sqlParameter[i].Value = property.GetValue(@ref) ?? DBNull.Value;
                }
            }
            result = sqlCommand.ExecuteNonQuery();
            return result;
        }
    }
}
