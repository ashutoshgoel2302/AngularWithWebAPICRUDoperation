using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using AngularAPI;

namespace AngularAPI.Controllers
{
    public class ChildrenController : ApiController
    {
        private AngularEntities db = new AngularEntities();

        // GET: api/Children
        public IQueryable<Child> GetChildren()
       {
            return db.Children;
        }

        // GET: api/Children/5
        [ResponseType(typeof(Child))]
        public IHttpActionResult GetChild(int id)
        {
            Child child = db.Children.Find(id);
            if (child == null)
            {
                return NotFound();
            }

            return Ok(child);
        }

        // PUT: api/Children/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutChild(int id, Child child)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != child.ID)
            {
                return BadRequest();
            }

            db.Entry(child).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChildExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Children
        [ResponseType(typeof(Child))]
        public IHttpActionResult PostChild(Child child)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            db.Children.Add(child);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = child.ID }, child);
        }

        // DELETE: api/Children/5
        [ResponseType(typeof(Child))]
        public IHttpActionResult DeleteChild(int id)
        {
            Child child = db.Children.Find(id);
            if (child == null)
            {
                return NotFound();
            }

            db.Children.Remove(child);
            db.SaveChanges();

            return Ok(child);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ChildExists(int id)
        {
            return db.Children.Count(e => e.ID == id) > 0;
        }

        public class MyResponse
        {
            public bool Status { get; set; }
            public string Message { get; set; }
        }

       // api/upload
       [HttpPost]
       [Route("api/children/upload")]
       public IHttpActionResult upload()
        {
            
            MyResponse status = new MyResponse();
            try
                {
                //var filesReadToProvider =  Request.Content.ReadAsMultipartAsync();
                //var context = HttpContext.Current.Request;
                //if (context.Files.Count > 0)
                //{
                 var filesReadToProvider = Request.Content.ReadAsMultipartAsync();
                //var index = 0;
                foreach (var streamContent in filesReadToProvider.Result.Contents)
                {
                    File file = new File();
                    var fileBytes = streamContent.ReadAsByteArrayAsync();
                    //MemoryStream ms = new MemoryStream(fileBytes.Result);
                    //Image img = Image.FromStream(ms);

                    string base64String=  Convert.ToBase64String(fileBytes.Result);
                    file.childID = filesReadToProvider.Id;
                    file.FileSize = fileBytes.Result.Length;
                    file.Document = base64String;

                    db.Files.Add(file);
                    db.SaveChanges();
                }
                status.Status = true;
                    status.Message = "File uploaded successfully";
                    return Ok(status);
                // }

                // return Json("Upload Successful.");

              
            }
                catch (System.Exception ex)
                {
                    return Json("Upload Failed: " + ex.Message);
                }
            
        }
    }

  
}