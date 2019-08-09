using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.BusinessLayer;
using MISA.Entity;
using MISA.Commons;


namespace TrainingPhase2.Controllers
{
    [RoutePrefix("ref")]
    public class RefController : ApiController
    {
        [Route("")]
        public AjaxResult Get()
        {
            var result = new AjaxResult();
            try
            {
                RefBL refBL = new RefBL();
                result.Success = true;
                result.Data = refBL.GetRefs();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
            }
            return result;
            
        }

        [Route("{id}")]
        public AjaxResult Get(Guid id)
        {
            var result = new AjaxResult();
            try
            {
                RefBL refBL = new RefBL();
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                throw;
            }
            return result;
        }

        // POST: api/Ref
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Ref/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Ref/5
        public void Delete(int id)
        {
        }
    }
}
