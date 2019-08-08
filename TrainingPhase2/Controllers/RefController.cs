using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.BusinessLayer;
using MISA.Entity;

namespace TrainingPhase2.Controllers
{
    [RoutePrefix("ref")]
    public class RefController : ApiController
    {
        [Route("")]
        public IEnumerable<RefViewModel> Get()
        {
            RefBL refBL = new RefBL();
            return refBL.GetRefs();
        }

        // GET: api/Ref/5
        public string Get(int id)
        {
            return "value";
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
