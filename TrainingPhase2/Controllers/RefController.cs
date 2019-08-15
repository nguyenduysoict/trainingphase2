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
                var refBL = new RefBL();
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
                var refBL = new RefBL();
                result.Data = refBL.GetRefById(id);
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

        [Route("")]
        public AjaxResult Post([FromBody]Ref @ref)
        {
            var result = new AjaxResult();
            try
            {
                var refBL = new RefBL();
                result.Data = refBL.AddNewRef(@ref);
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

        [Route("")]
        public AjaxResult Put([FromBody]Ref @ref)
        {
            var result = new AjaxResult();
            try
            {
                var refBL = new RefBL();
                result.Data = refBL.UpdateRef(@ref);
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

        // DELETE: api/Ref/5
        public void Delete(int id)
        {
        }
    }
}
