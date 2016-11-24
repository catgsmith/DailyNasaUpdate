var btnGo = document.getElementById("btnGo");


btnGo.addEventListener("click", getLocation);
var xhr = new XMLHttpRequest(); //create an XMLHttpReq object

function getLocation() {

    console.log("clicked button: ");
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

    
for (var i=0; i<data.length; i++){
console.log(data + "DDDDDDD")  
      
    



    } // end of for loop 
         
    } else {
        console.log("oops!");
        
    }    
    
 


    
        
}