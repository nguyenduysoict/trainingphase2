using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using MISA.Entity;

namespace MISA.DataLayer
{
    public class RefDL
    {
        public IEnumerable<RefViewModel> GetRefs()
        {
            var refs = new RefViewModel();
            string connectionString = @"Data Source=DATABASE\SQL2014;Initial Catalog=MISA.Phase2;Integrated Security=True";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            sqlConnection.Open();
            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = "[dbo].[Proc_GetAllData]";
            sqlCommand.Parameters.AddWithValue("@TableName", "View_Ref");

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                    var propertyName = sqlDataReader.GetName(i);
                    // Lấy ra giá trị của field hiện tại:
                    var propertyValue = sqlDataReader.GetValue(i);
                    // Gán Value cho Property tương ứng:
                    var propertyInfo = refs.GetType().GetProperty(propertyName);
                    if (propertyInfo != null && propertyValue != DBNull.Value)
                    {
                        propertyInfo.SetValue(refs, propertyValue);
                    }
                }
                yield return refs;

            }
            sqlConnection.Close();
        }

    }
}
