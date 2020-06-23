console.log("This is the index.js file in public folder.");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne= document.querySelector("#message-1")
const messageTwo= document.querySelector("#message-2")
const messageThree= document.querySelector("#message-3")
const messageFour= document.querySelector("#message-4")
const messageFive= document.querySelector("#message-5")
const messageSix= document.querySelector("#message-6")
const messageSeven= document.querySelector("#message-7")
const messageEight= document.querySelector("#message-8")

// messageOne.textContent="";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent='Loading...';
  messageTwo.textContent='';
  messageThree.textContent='';
  messageFour.textContent='';
  messageFive.textContent='';
  messageSix.textContent='';
  messageSeven.textContent='';
  messageEight.textContent='';

  fetch("/weather?address="+location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
          messageOne.textContent=data.error;
        // console.log(data.error);
      } else {
          messageOne.textContent="Location: "+data.Location;
          messageTwo.textContent=data.forcast.date;
          messageThree.textContent="Temperature: "+data.forcast.Temperature+" ℃";
          messageFour.textContent="Pressure: "+data.forcast.pressure+" hPa";
          messageFive.textContent="Humdity: "+data.forcast.Humdity+"%";
          messageSix.textContent="Clouds: "+data.forcast.clouds+"%";
          messageSeven.textContent="Wind Speed: "+(data.forcast.wind_speed)*(3.6)+" km/h";
          messageEight.textContent="Weather: "+data.forcast.weather;
          
        // console.log(data.forcast);
      }
    });
  });
//   console.log(location);
});
