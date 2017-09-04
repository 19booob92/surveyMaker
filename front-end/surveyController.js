function init() {
	var xmlHttp = new XMLHttpRequest();
	if (xmlHttp.withCredentials !== undefined) {
xmlHttp.open("GET", "http://192.168.8.102:8081/generateSurvey", true);
    		xmlHttp.send(null);
    		xmlHttp.onload = function () {
			alert('hest ok');
    	};

	}
    		
};
