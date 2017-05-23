using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgumentDiagram.Models
{
    public class ArgumentDiagramModel
    {
        public int id { get; set; }
        public string test { get; set; }
        public Boolean stackChildren { get; set; }
        public List<ArgumentDiagramModel> children { get; set; }
    }
}
