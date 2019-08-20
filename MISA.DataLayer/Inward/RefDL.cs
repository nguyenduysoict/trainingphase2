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
        public IEnumerable<RefViewModel> GetRefs()
        {
            var tableName = "View_Ref";
            IEnumerable<RefViewModel> refs = this.GetAllData<RefViewModel>(tableName);
            return refs;
        }

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

        public IEnumerable<Ref> GetRefById(Guid id)
        {
            var tableName = "Ref";
            var columnName = "RefID";
            IEnumerable<Ref> @ref = this.GetDataById<Ref>(tableName,columnName,id);
            return @ref;
        }

        public string AddNewRef(Ref @ref)
        {
            string connectionString = @"Data Source=DATABASE\SQL2014;Initial Catalog=MISA.Phase2;Integrated Security=True";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = "[dbo].[Proc_InsertRef]";
            sqlConnection.Open();

            //sqlCommand.Parameters.AddWithValue("@RefNo", @ref.RefNo);
            //sqlCommand.Parameters.AddWithValue("@RefDate", @ref.RefDate);
            //sqlCommand.Parameters.AddWithValue("@RefTypeID", @ref.RefTypeID);
            //sqlCommand.Parameters.AddWithValue("@TotalAmount", @ref.TotalAmount);
            //sqlCommand.Parameters.AddWithValue("@JournalMemo", @ref.JournalMemo);
            //sqlCommand.Parameters.AddWithValue("@AccountObjectID", @ref.AccountObjectID);

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

            var result = sqlCommand.ExecuteScalar();
            if(result == null)
            {
                result = "";
            } else
            {
                result = result.ToString();
            };

            return result.ToString();
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
