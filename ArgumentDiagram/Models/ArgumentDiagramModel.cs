using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgumentDiagram.Models
{
    public class ArgumentDiagramModel
    {
        public int id { get; set; }
        public TextModel text { get; set; }
        public List<ArgumentDiagramModel> children { get; set; }
        public string HTMLid;

        public ArgumentDiagramModel(String description, int newId)
        {
            id = newId;
            HTMLid = newId.ToString();
            children = new List<ArgumentDiagramModel>();
            TextModel textModel = new TextModel(description);
            text = textModel;
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
