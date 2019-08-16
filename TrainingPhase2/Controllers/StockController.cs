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
    [RoutePrefix("stock")]
    public class StockController : ApiController
    {
        [Route("")]
        public AjaxResult Get()
        {
            var result = new AjaxResult();
            try
            {
                var stockBL = new StockBL();
                result.Success = true;
                result.Data = stockBL.GetStocks();
            }
            catch (Exception ex)
            {
                result.Data = ex;
                result.Success = false;
            }
            return result;
        }

        // GET: api/Stock/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Stock
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Stock/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Stock/5
        public void Delete(int id)
        {
        }
    }
}
