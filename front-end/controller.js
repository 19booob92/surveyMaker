var url = 'http://192.168.0.6:8081/diagramData'

function init() {
	var $ = go.GraphObject.make;
	var myDiagram = $(go.Diagram, "myDiagramDiv", 
		{
	      		initialContentAlignment: go.Spot.Top,
	      		"undoManager.isEnabled": true
	    	}
	);

	//myDiagram.toolManager.textEditingTool.defaultTextEditor = window.TextEditor;
	myDiagram.toolManager.mouseDownTools.add($(LinkShiftingTool));

	myDiagram.nodeTemplate = 
		$(go.Node,
			{
				width: "100px", 
				height : "100px",
				fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides,
          			locationSpot: go.Spot.Center,
          			fromLinkable: true, toLinkable: true
			},
        		new go.Binding("location"),
			$(go.Shape, "Circle",
        			{ fill: "white" },
        			new go.Binding("fill", "color")),
			$(go.TextBlock,
      				"100 %",
      				{ margin: 20, editable: true, stroke: "black", font: "bold 10px sans-serif" },
				{fromLinkable: false, toLinkable: false},
      				new go.Binding("text", "value")),
			$(go.TextBlock,
      				"Nazwa",
      				{ margin: 34, editable: true, stroke: "black", font: "bold 10px sans-serif" },
				{fromLinkable: false, toLinkable: false},
      				new go.Binding("text", "name")),
			$(go.TextBlock,
      				"100 %",
      				{ margin: 46, editable: true, stroke: "black", font: "bold 10px sans-serif", isMultiline: true },
				{fromLinkable: false, toLinkable: false},
      				new go.Binding("text", "question").makeTwoWay())
		);

    		myDiagram.model.nodeDataArray=[
      			{ key:1, color: "red",  value: "100%", name: "Nazwa", question: "pytanie", location: new go.Point(0, 0) },
      			{ key:2, color: "green", value: "100%", name: "Nazwa", question: "pytanie", location: new go.Point(200, 100) },
      			{ key:3, color: "grey", value: " ", name: "Nazwa", question: "pytanie dodatkowe", location: new go.Point(400, 100) }
    		];

		var currentID = 2;
		myDiagram.model.makeUniqueKeyFunction = function(model, nodedata) {
			if (currentID < 0) {
				currentID = -1 * currentID;	
			}
			return currentID++;
		}
    
		var button = document.getElementById('sendBtn');
		button.addEventListener('click', function() {
			sendData(myDiagram.model.toJson());
		}, false);
}

var sendData = function(model) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", url);
	xmlhttp.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
	xmlhttp.send(model);
}
