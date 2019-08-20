using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Collections;

namespace MISA.DataLayer
{
    public class DataAccess:IDisposable
    {
        #region properties
        //Đối tượng SqlConnection kết nối dữ liệu
        protected SqlConnection sqlConnection;
        //Đối tượng SqlCommand khai báo câu lệnh Sql
        protected SqlCommand sqlCommand;
        //Chuỗi kết nối đến cơ sở dữ liệu
        protected string connectionString = @"Data Source=DATABASE\SQL2014;Initial Catalog=MISA.Phase2;Integrated Security=True";
        #endregion

        /// <summary>
        /// Khởi tạo đối tượng thực hiện kết nối cơ sở dữ liệu
        /// </summary>
        public DataAccess()
        {
            //Thực hiện việc kết nối đến cơ sở dữ liệu
            sqlConnection = new SqlConnection(connectionString);
            //Tạo đối tượng sqlCommand
            sqlCommand = sqlConnection.CreateCommand();
            //Khai báo loại câu lệnh truy vấn là StoreProcedure
            sqlCommand.CommandType = CommandType.StoredProcedure;
            //Mở kết nối 
            sqlConnection.Open();
        }

        public int ExecuteNonQuery(string StoredProcedureName)
        {
            sqlCommand.CommandText = StoredProcedureName;
            return sqlCommand.ExecuteNonQuery();
        }

        public int ExecuteNonQuery(string StoredProcedureName, object parameter)
        {
            sqlCommand.CommandText = StoredProcedureName;
            AddParamsToSqlCommand(parameter);
            return sqlCommand.ExecuteNonQuery();
        }

        public SqlDataReader ExecuteReader(string StoredProcedureName)
        {
            sqlCommand.CommandText = StoredProcedureName;
            return sqlCommand.ExecuteReader();
        }

        public SqlDataReader ExecuteReader(string StoredProcedureName, object parameter)
        {
            sqlCommand.CommandText = StoredProcedureName;
            AddParamsToSqlCommand(parameter);
            return sqlCommand.ExecuteReader();
        }
        public object ExecuteScalar(string StoredProcedureName)
        {
            sqlCommand.CommandText = StoredProcedureName;
            return sqlCommand.ExecuteScalar();
        }
    
        public object ExecuteScalar(string StoredProcedureName, object parameter)
        {
            sqlCommand.CommandText = StoredProcedureName;
            AddParamsToSqlCommand(parameter);
            return sqlCommand.ExecuteScalar();
        }


        private void AddParamsToSqlCommand(object parameter)
        {
            var type = parameter.GetType().Name;

            switch (type)
            {
                case "Hashtable":
                    var hashtable = (Hashtable)parameter;
                    foreach (DictionaryEntry param in hashtable)
                    {
                        sqlCommand.Parameters.AddWithValue("@" + param.Key, param.Value);
                    }
                    break;
                default:
                    var properties = parameter.GetType().GetProperties();
                    foreach (var prop in properties)
                    {
                        if (prop.GetValue(parameter) != null)
                        {
                            sqlCommand.Parameters.AddWithValue("@" + prop.Name, prop.GetValue(parameter));
                        }
                    }
                    break;
            }
            
        }

        public SqlCommand SetParamsToSqlCommand<T>(string storeProcedure, T entity)
        {
            sqlCommand.CommandText = storeProcedure;
            SqlCommandBuilder.DeriveParameters(sqlCommand);
            var sqlParameters = sqlCommand.Parameters;

            for (int i = 1; i < sqlParameters.Count; i++)
            {
                var parameterName = sqlParameters[i].ParameterName.Replace("@", string.Empty);
                var property = entity.GetType().GetProperty(parameterName);
                if (property != null)
                {
                    sqlParameters[i].Value = property.GetValue(entity) ?? DBNull.Value;
                }
            }

            return sqlCommand;
        }

        /// <summary>
        /// Đóng kết nối cơ sở dữ liệu khi sử dụng using
        /// </summary>
        public void Dispose()
        {
            sqlConnection.Close();
        }
    }
}
