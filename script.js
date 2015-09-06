

$(document).ready(function() {
	
	
//lol trippy
var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('.mainSection').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);


// Man dat weather API sure has a lot of codes. Lets assign each one an icon
	var weatherCodes = {
		0:'<i class= "wi wi-tornado"></i>',
		1:'<i class= "wi wi-day-thunderstorm"></i>',
		2:'<i class= "wi wi-hurricane"></i>',
		3:'<i class= "wi wi-lightning"></i>',
		4:'<i class= "wi wi-day-thunderstorm"></i>',
		5:'<i class= "wi wi-rain-mix"></i>',
		6:'<i class= "wi wi-sleet"></i>',
		7:'<i class= "wi wi-sleet"></i>',
		8:'<i class= "wi wi-rain-mix"></i>',
		9:'<i class= "wi wi-rain-mix"></i>',
		10:'<i class= "wi wi-rain-mix"></i>',
		11:'<i class= "wi wi-showers"></i>',
		12:'<i class= "wi wi-showers"></i>',
		13:'<i class= "wi wi-snow-wind"></i>',
		14:'<i class= "wi wi-snow"></i>',
		15:'<i class= "wi wi-snow-wind"></i>',
		16:'<i class= "wi wi-snow"></i>',
		17:'<i class= "wi wi-hail"></i>',
		18:'<i class= "wi wi-sleet"></i>',
		19:'<i class= "wi wi-dust"></i>',
		20:'<i class= "wi wi-fog"></i>',
		21:'<i class= "wi wi-day-haze"></i>',
		22:'<i class= "wi wi-smoke"></i>',
		23:'<i class= "wi wi-strong-wind"></i>',
		24:'<i class= "wi wi-windy"></i>',
		25:'<i class= "wi wi-snowflake-cold"></i>',
		26:'<i class= "wi wi-cloudy"></i>',
		27:'<i class= "wi wi-night-alt-cloudy"></i>',
		28:'<i class= "wi wi-day-cloudy"></i>',
		29:'<i class= "wi wi-night-alt-cloudy"></i>',
		30:'<i class= "wi wi-day-cloudy"></i>',
		31:'<i class= "wi wi-night-clear"></i>',
		32:'<i class= "wi wi-day-sunny"></i>',
		33:'<i class= "wi wi-night-clear"></i>',
		34:'<i class= "wi wi-day-sunny"></i>',
		35:'<i class= "wi wi-rain-mix"></i>',
		36:'<i class= "wi wi-hot"></i>',
		37:'<i class= "wi wi-thunderstorm"></i>',
		38:'<i class= "wi wi-thunderstorm"></i>',
		39:'<i class= "wi wi-thunderstorm"></i>',
		40:'<i class= "wi wi-showers"></i>',
		41:'<i class= "wi wi-snow"></i>',
		42:'<i class= "wi wi-snow"></i>',
		43:'<i class= "wi wi-snow"></i>',
		44:'<i class= "wi wi-cloud"></i>',
		45:'<i class= "wi wi-storm-showers"></i>',
		46:'<i class= "wi wi-snow"></i>',
		47:'<i class= "wi wi-thunderstorm"></i>'
	}
	
	

	//these be the DOM output sections
	var longlatOutput = document.getElementById("longlatResult");
	var mapOutput = document.getElementById("mapResult");
	var weatherOutput = document.getElementById("weatherResult");

	
	//Gimmie dat location please
	function getLocation(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(showPosition, showError , {enableHighAccuracy:true});
			}
		else{
				longlatOutput.innerHTML = "Geolocation is not supported by this browser"
			}	
		}
		
		
	//After succesfully getting dat location give it to the weather plugin to work its magic, also generate the long/lat and map outputs	
		function showPosition(position){			
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var accuracy = position.coords.accuracy;			
			loadWeather(latitude+','+longitude);
			longlatOutput.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude + "<br>Accuracy: " + accuracy;
			 var img = new Image();
    			img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
     		mapOutput.appendChild(img);
		}
		
		function showError(error){
			longlatOutput.innerHTML = "Error" + error + error.message;
		}
		
		
		
	//weather plugin outputting to the DOM
		function loadWeather(location, woeid) {
  			$.simpleWeather({
    			location: location,
   				woeid: woeid,
    			unit: 'c',
    			success: function(weather) {
    				html = '<div class="weatherItem weatherIcon">' + weatherCodes[weather.code] + '</div>';
					html += '<div class="weatherItem"><h2> '+weather.temp+'&deg;'+weather.units.temp+'</h2></div>';
				    html += '<div class="weatherItem">'+weather.city+', '+weather.region+', ' +weather.country+'</div>';
				  
				    html += '<div class="weatherItem">'+weather.currently+'</div>';
				    html += '<div class="weatherItem">'+weather.alt.temp+'&deg;F</div>'; 
      				$("#weatherResult").html(html);
    		  },    				
	    		error: function(error) {
	      			$("#weatherResult").html('<p>'+error+'</p>');
	    		}
 			 });
		}
		
		getLocation();
});
	



	
	
	
   
