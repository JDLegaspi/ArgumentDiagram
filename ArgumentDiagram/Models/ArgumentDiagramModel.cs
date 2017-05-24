using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgumentDiagram.Models
{
    public class ArgumentDiagramModel
    {
        public TextModel text { get; set; }
        public Boolean stackChildren = true;
        public List<ArgumentDiagramModel> children { get; set; }


        public void addChild(ArgumentDiagramModel child)
        {
            children.Add(child);
        }

    }

    public class TextModel
    {
        public string name { get; set; }
    }
}
