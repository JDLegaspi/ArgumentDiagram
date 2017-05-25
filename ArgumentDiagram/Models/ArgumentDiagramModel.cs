using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgumentDiagram.Models
{
    public class ArgumentDiagramModel
    {
        public TextModel text { get; set; }
        public List<ArgumentDiagramModel> children { get; set; }

        public ArgumentDiagramModel()
        {
            children = new List<ArgumentDiagramModel>();
        }

        public void addChild(ArgumentDiagramModel child)
        {
            children.Add(child);
        }

    }

    public class TextModel
    {
        public String name { get; set; }
        public TextModel(String argText)
        {
            name = argText;
        }
    }
}
