var url = "http://" + properties.url + ":8081/generateSurvey"
var urlToSend = "http://" + properties.url + ":8081/processSurvey"
var urlDataForChart = "http://" + properties.url + ":8081/chartData"

function init() {
	google.charts.load("current", {packages:["corechart"]});

	$('#piechart_3d').hide();

	var xmlHttp = new XMLHttpRequest();
	if (xmlHttp.withCredentials !== undefined) {
		xmlHttp.open("GET", url , true);
    		xmlHttp.send(null);
    		xmlHttp.onload = function () {
			document.getElementById('form').insertAdjacentHTML('afterbegin', xmlHttp.responseText);
		};
	};

	initButton();
};

function initButton() {
	var btn = $('#sendBtn');
	var formToSend = $('#form');

	var xmlHttp = new XMLHttpRequest();
	btn.click(function() {
		var data = JSON.stringify(formToSend.serializeArray());
		
		if (xmlHttp.withCredentials !== undefined) {
			xmlHttp.open("POST", urlToSend , true);
	    		xmlHttp.send(data);

			fetchDataForChart();			
		};
	});
};

function fetchDataForChart() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", urlDataForChart , true);
    	xmlHttp.send(null);
    	xmlHttp.onload = function () {
		var data = processData(xmlHttp.responseText);

		drawChart(data);
	};
};

function processData() {};

function drawChart(data) {
	var data = google.visualization.arrayToDataTable([
		['Task', 'Hours per Day'],
		['Work',     11],
		['Eat',      2],
		['Commute',  2],
		['Watch TV', 2],
		['Sleep',    7]
	]);

	var options = {
		title: 'Podzial majatku',
		is3D: true,
	};
	
	var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
	chart.draw(data, options);

	$('#piechart_3d').show();
}
