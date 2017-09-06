var url = "http://" + properties.url + ":8081/generateSurvey"

function init() {
	var xmlHttp = new XMLHttpRequest();
	if (xmlHttp.withCredentials !== undefined) {
		xmlHttp.open("GET", url , true);
    		xmlHttp.send(null);
    		xmlHttp.onload = function () {
			document.getElementById('form').insertAdjacentHTML('afterbegin', xmlHttp.responseText);
		};
	};
};
