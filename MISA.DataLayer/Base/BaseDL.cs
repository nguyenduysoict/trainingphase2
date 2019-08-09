using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace MISA.DataLayer
{
    public class BaseDL
    {
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

        public IEnumerable<T> GetDataById<T>(string tableName, string id)
        {
            var storedProcedure = "[dbo].[Proc_GetDataById]";
            var parameter = new Hashtable();
            var item = Activator.CreateInstance<T>();
            parameter.Add("TableName", tableName);
            parameter.Add("Id", id);
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
    }
}
