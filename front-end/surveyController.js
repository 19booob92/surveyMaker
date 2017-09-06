var url = "http://" + properties.url + ":8081/generateSurvey"
var urlToSend = "http://" + properties.url + ":8081/sendSurvey"

function init() {
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
		};
	});
};
