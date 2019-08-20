using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using MISA.Commons;

namespace MISA.DataLayer
{
    public class BaseDL
    {
        protected DataFormater dataFormater;
        public BaseDL()
        {
            dataFormater = new DataFormater();
        }
        /// <summary>
        /// Lấy tất cả dữ liệu theo bảng trong cơ sở
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public IEnumerable<T> GetAllData<T>(string tableName)
        {
            var storedProcedure = "[dbo].[Proc_GetAllData]";
            var parameter = new Hashtable();
            var item = Activator.CreateInstance<T>();
            parameter.Add("TableName", tableName);
            using (DataAccess dataAccess = new DataAccess())
            {
                SqlDataReader dataReader = dataAccess.ExecuteReader(storedProcedure, parameter);

                while (dataReader.Read())
                {
                    for(int i = 0; i < dataReader.FieldCount; i++)
                    {
                        var fieldName = dataReader.GetName(i);
                        var fieldValue = dataReader.GetValue(i);
                        var property = item.GetType().GetProperty(fieldName);
                        if(property != null && fieldValue != DBNull.Value)
                        {
                            property.SetValue(item, fieldValue);
                        }
                    }
                    yield return item;
                }
            }
        }

        /// <summary>
        /// Lấy bản ghi theo id truyền vào 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="tableName"></param>
        /// <param name="columnName"></param>
        /// <param name="id"></param>
        /// <returns></returns>

        public IEnumerable<T> GetDataById<T>(string tableName, string columnName , Guid id)
        {
            var storedProcedure = "[dbo].[Proc_GetDataById]";
            var parameter = new Hashtable();
            var item = Activator.CreateInstance<T>();
            var stringId = dataFormater.convertToNvarchar(id);
            parameter.Add("TableName", tableName);
            parameter.Add("ColumnName", columnName);
            parameter.Add("Id", stringId);
            using(DataAccess dataAccess = new DataAccess())
            {
                SqlDataReader dataReader = dataAccess.ExecuteReader(storedProcedure, parameter);

                while (dataReader.Read())
                {
                    for (int i = 0; i < dataReader.FieldCount; i++)
                    {
                        var fieldName = dataReader.GetName(i);
                        var fieldValue = dataReader.GetValue(i);
                        var property = item.GetType().GetProperty(fieldName);
                        if (property != null && fieldValue != DBNull.Value)
                        {
                            property.SetValue(item, fieldValue);
                        }
                    }
                    yield return item;
                }
            }
        }

        /// <summary>
        /// Thêm mới Entity vào cơ sở dữ liệu
        /// </summary>
        /// <typeparam name="T"> Kiểu đối tượng </typeparam>
        /// <param name="storedProcedure"> Tên store trong database </param>
        /// <param name="entity"> Đối tượng </param>
        /// <returns></returns>

        public int InsertEntity<T>(string storedProcedure, T entity)
        {
            var result = -1;
            using(DataAccess dataAccess = new DataAccess())
            {
                var sqlCommand = dataAccess.SetParamsToSqlCommand(storedProcedure, entity);
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;
                try
                {
                    result = sqlCommand.ExecuteNonQuery();
                    sqlTransaction.Commit();
                }
                catch (Exception e)
                {
                    sqlTransaction.Rollback();
                    throw;
                }
                return result;
            }
        }
    }
}
