using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Web.Script.Serialization;
using ArgumentDiagram.Models;

namespace ArgumentDiagram.Controllers
{
    public class ArgumentDiagramController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddNode(String argText)
        {
            TextModel text = new TextModel(argText);
            ArgumentDiagramModel childObject = new ArgumentDiagramModel();
            childObject.text = text;

            return Json(childObject);
        }
    }
}