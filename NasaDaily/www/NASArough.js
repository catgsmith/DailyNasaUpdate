var btnGo = document.getElementById("btnGo");


btnGo.addEventListener("click", getLocation);
var xhr = new XMLHttpRequest(); //create an XMLHttpReq object

function getLocation() {

    console.log("Clicked button: ");
    var latitude = document.getElementById("whichLat").value;
    var longitude = document.getElementById("whichLon").value;

    //http://api.open-notify.org/iss-pass.json?lat=53&lon=9
    var whichData = "http://api.open-notify.org/iss-pass.json?lat=" + latitude +
        "&lon=" + longitude + ""; // add the api key here!

    var whichMethod = "GET";
    xhr.open(whichMethod, whichData); //specifies the request using the GET method along with the file location (url)

    xhr.onreadystatechange = handleReadyState;
    xhr.send(); //sends req to the server, used for GET requests

}

function handleReadyState(response) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.response);
        console.log(data);

 console.log("WORKS UNTIL HERE");

        
var times=data["response"]    
for (var i=0; i<times.length; i++){
console.log(times[i].risetime + "    Uncalculated Risetime"); 
    
var date = new Date(times[i].risetime*1000);
console.log(date + "     HERE HERE HERE HERE");   

     
//var individualtimes = ["date"]  
//for (var i=0; i<date.length; i++){
//console.log(date[i].risetime + "    Uncalculated Risetime");    
    
    document.getElementById("output").innerHTML="Nearest sighting is      :   " + date 
    
    } // end of for loop
        
console.log("ALSO WORKS UNTIL HERE");
        
        

        
    } else {
        console.log("Why Oops!");
        
    }    
    
    
        
}