using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgumentDiagram.Models
{
    public class ArgumentDiagramModel
    {
        public TextModel text { get; set; }
        public Boolean stackChildren;
        public List<ArgumentDiagramModel> children { get; set; }

        public ArgumentDiagramModel()
        {
            stackChildren = true;
            children = new List<ArgumentDiagramModel>();
        }

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
