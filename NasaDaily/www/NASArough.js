console.log("~Log: hello ");
btnGo.addEventListener("click", getLocation)
let xhr = new XMLHttpRequest()

function getLocation(){
    console.log("clicked button: ");
    let latitude = document.getElementById("whichLat").value
    let longitude = document.getElementById("whichLon").value 
    
    let whichData = `http://api.open-notify.org/iss-pass.json?q=${latitude},${longitude}`
    
    let whichMethod = "GET"
    xhr.open(whichMethod, whichData)
    
    xhr.onreadystatechange = handleReadyState
    xhr.send()
    
}
    
    function handleReadyState(response){
        if (xhr.readyState == 4 && xhr.status == 200){
         let data = JSON.parse(xhr.response)   
            console.log(data.latitude)
            
            let desc=data.latitude[0].description
            document.getElementById("output").innerHTML=desc
            
            
        }
        
    }
    
    
                           
    



                                      
    


















                                      
                                      
       