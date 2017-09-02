
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
        xhr = new XDomainRequest();
        xhr.open(method, url);
    return xhr;
}





function init() {
var request = createCORSRequest("get", "http://192.168.0.6:8081/generateSurvey");
alert('qwe');
if (request){
    request.onload = function() {
        // ...
	    alert('Test');
    };
    request.onreadystatechange = function() {alert('2');};
    request.send();
}

