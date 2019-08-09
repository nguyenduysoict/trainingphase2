using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.Commons;
using MISA.BusinessLayer;

namespace TrainingPhase2.Controllers
{
    [RoutePrefix("RefDetail")]
    public class RefDetailController : ApiController
    {
        [Route("")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value3", "value2" };
        }

        [Route("{id}")]
        public AjaxResult Get(Guid id)
        {
            var result = new AjaxResult();
            try
            {

                RefDetailBL refDetailBL = new RefDetailBL();
                result.Success = true;
                result.Data = refDetailBL.GetRefDetailById(id);

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
            }
            return result;
        }

        // POST: api/RefDetail
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/RefDetail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/RefDetail/5
        public void Delete(int id)
        {
        }
    }
}
