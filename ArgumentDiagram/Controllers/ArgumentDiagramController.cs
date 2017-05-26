using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
            ArgumentDiagramModel childObject = new ArgumentDiagramModel(argText, 1);

            return Json(childObject);
        }
    }
}