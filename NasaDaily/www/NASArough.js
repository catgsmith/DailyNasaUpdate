var btnGo = document.getElementById("btnGo");


btnGo.addEventListener("click", getLocation);
var xhr = new XMLHttpRequest();

function getLocation() {

    console.log("clicked button: ");
    var latitude = document.getElementById("whichLat").value;
    var longitude = document.getElementById("whichLon").value;

    //http://api.open-notify.org/iss-pass.json?lat=53&lon=9
    var whichData = "http://api.open-notify.org/iss-pass.json?lat=" + latitude +
        "&lon=" + longitude + ""; // add the api key here!

    var whichMethod = "GET";
    xhr.open(whichMethod, whichData);

    xhr.onreadystatechange = handleReadyState;
    xhr.send();

}

function handleReadyState(response) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.response);
        console.log(data);

        // var desc = data.latitude[0].description;
        // document.getElementById("output").innerHTML = desc;
    } else {
        console.log("oops!");
    }
}