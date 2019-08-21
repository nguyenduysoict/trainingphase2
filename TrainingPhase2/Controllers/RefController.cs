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
        /// <summary>
        /// Lấy danh sách chứng từ
        /// </summary>
        /// <returns></returns>
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

        [Route("refno")]
        public AjaxResult GetRefNo()
        {
            var result = new AjaxResult();
            try
            {
                var refBL = new RefBL();
                result.Success = true;
                result.Data = refBL.GetRefNo();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
            }
            return result;
            
        }

        /// <summary>
        /// Lấy chứng từ theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

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
        /// <summary>
        /// Nhận dữ liệu chứng từ gửi từ client
        /// </summary>
        /// <param name="refSaveData"></param>
        /// <returns></returns>
        [Route("")]
        public AjaxResult Post([FromBody]RefSaveData refSaveData)
        {
            var result = new AjaxResult();
            try
            {
                var refBL = new RefBL();
                refBL.InsertRef(refSaveData);
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
            }
            return result;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ref"></param>
        /// <returns></returns>

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
