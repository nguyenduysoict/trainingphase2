using MISA.BusinessLayer;
using MISA.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TrainingPhase2.Controllers
{
    [RoutePrefix("item")]
    public class ItemController : ApiController
    {
        [Route("")]
        public AjaxResult Get()
        {
            var result = new AjaxResult();
            try
            {
                result.Success = true;
                var itemBL = new ItemBL();
                result.Data = itemBL.GetItems();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
                throw;
            }
            return result;
        }

        // GET: api/Item/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Item
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Item/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Item/5
        public void Delete(int id)
        {
        }
    }
}
