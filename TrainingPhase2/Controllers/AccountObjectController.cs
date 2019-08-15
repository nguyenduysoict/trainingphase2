using MISA.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.BusinessLayer;

namespace TrainingPhase2.Controllers
{
    [RoutePrefix("accountobject")]
    public class AccountObjectController : ApiController
    {
        [Route("")]
        public AjaxResult Get()
        {
            var result = new AjaxResult();
            try
            {
                var accountObjectBL = new AccountObjectBL();
                result.Data = accountObjectBL.GetAccountObjects();
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
                throw;
            }

            return result;

        }

        // GET: api/AccountObject/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AccountObject
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/AccountObject/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/AccountObject/5
        public void Delete(int id)
        {
        }
    }
}
