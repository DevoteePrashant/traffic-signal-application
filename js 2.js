const form = document.getElementById("myForm");
const defaultTimes = [12, 35, 24, 31];
let sumbmitData = false
let currentTimers = [];

document.addEventListener("DOMContentLoaded", function () {
  const inputs = ["set_time", "set_time2", "set_time3", "set_time4"];

  inputs.forEach((id, index) => {
    document.getElementById(id).value = defaultTimes[index];
  });

  setInitialYellow();

  inputs.forEach((id, index) => {
    startTrafficLightSequence(index + 1, defaultTimes[index]);
  });
});

if(sumbmitData){
  clearInterval(sumbmitData); 
}

form.addEventListener("submit", (event) => {
   sumbmitData =true
  event.preventDefault();

  let i = 0;
  const colors = ["red", "yellow", "green"];
  const colors2 = ["red", "yellow", "red"];
  let count = 1;
  
  function trafficLight() {
    const bulbs = document.querySelectorAll(".bulb");
    bulbs.forEach((bulb) => {
      bulb.style.background = "black";
    });
    bulbs[i].style.background = colors[i];
    if (count <= quarterSeconds) {
      count++;
    } else {
      i = (i + 1) % colors.length;
    }
  }
  
  function trafficLight2() {
    const bulbs = document.querySelectorAll(".bulb1");
    bulbs.forEach((bulb) => {
      bulb.style.background = "black";
    });
    bulbs[i].style.background = colors[i];
    if (count <= quarterSeconds) {
      count++;
    } else {
      i = (i + 1) % colors.length;
    }
  }
  
  function trafficLight3() {
    const bulbs = document.querySelectorAll(".bulb2");
    bulbs.forEach((bulb) => {
      bulb.style.background = "black";
    });
    bulbs[i].style.background = colors[i];
    if (count <= quarterSeconds) {
      count++;
    } else {
      i = (i + 1) % colors.length;
    }
  }
  
  function trafficLight4() {
    const bulbs = document.querySelectorAll(".bulb3");
    bulbs.forEach((bulb) => {
      bulb.style.background = "black";
    });
    bulbs[i].style.background = colors2[i];
    if (count <= quarterSeconds) {
      count++;
    } else {  
      i = (i + 1) % colors2.length;
    }
  }
  
  setInterval(trafficLight, 5000  ); 
  setInterval(trafficLight2, 5000  );
  setInterval(trafficLight3, 5000  ); 
  setInterval(trafficLight4, 5000  ); 
currentTimers.forEach(clearInterval);
  currentTimers = [];

  const totalSeconds = parseInt(document.getElementById('Total_second').value) || 0;
  const quarterSeconds = Math.floor(totalSeconds / 3);

  ['set_time', 'set_time2', 'set_time3', 'set_time4'].forEach((id, index) => {
    document.getElementById(id).value = quarterSeconds;
    startTrafficLightSequence(index + 1, quarterSeconds);
  });

});

["set_time", "set_time2", "set_time3", "set_time4"].forEach((id, index) => {
  document.getElementById(id).addEventListener("input", () => {
    const newValue = parseInt(document.getElementById(id).value);

    if (currentTimers[index]) {
      clearInterval(currentTimers[index]);
    }

    startTrafficLightSequence(index + 1, newValue);
  });
});

function setInitialYellow() {
  for (let i = 1; i <= 4; i++) {
    const redLight = document.getElementById(`red${i}`);
    const yellowLight = document.getElementById(`yellow${i}`);
    const greenLight = document.getElementById(`green${i}`);

    redLight.classList.remove("red");
    yellowLight.classList.add("yellow");
    greenLight.classList.remove("green");
  }
}

function startTrafficLightSequence(activeIndex, set_time, quarterSeconds) {
  const bulbShowTime = document.getElementById(`bulb_show_time${activeIndex}`);
  const allLights = [1, 2, 3, 4];

  let remainingTime = set_time;
  bulbShowTime.innerHTML = convertStoMs(remainingTime);

  changeLights(activeIndex);

  const timer = setInterval(() => {
    remainingTime--;
    bulbShowTime.innerHTML = convertStoMs(remainingTime);

    if (remainingTime <= 0) {
      remainingTime = set_time;
      changeLights(activeIndex);
    }
  }, 1000);

  currentTimers[activeIndex - 1] = timer;

  function changeLights(activeIndex) {
    allLights.forEach((index) => {
      const redLight = document.getElementById(`red${index}`);
      const yellowLight = document.getElementById(`yellow${index}`);
      const greenLight = document.getElementById(`green${index}`);

      if (index === activeIndex) {
        redLight.classList.remove("red");
        yellowLight.classList.remove("yellow");
        greenLight.classList.add("green");
      } else {
        redLight.classList.add("red");
        yellowLight.classList.remove("yellow");
        greenLight.classList.remove("green");
      }
    });
  }

  function convertStoMs(seconds) {
    if (seconds <= 0) {
      return "00:00";
    }

    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    return minutes + ":" + extraSeconds;
  }
}


// const jsonData = {
//     "timeRanges": [
//       {"id": 1, "startTime": "00:00", "endTime": "00:30"},
//       {"id": 2, "startTime": "00:30", "endTime": "01:00"},
//       {"id": 3, "startTime": "01:00", "endTime": "01:30"}
//     ]
//   };
  
//   console.log(jsonData);


//   const fs = require('fs');
// const logData = fs.readFileSync('time.json', 'utf8');
// const log = JSON.parse(logData);

// console.log(log.futureDate);
// console.log(log.currentTime);