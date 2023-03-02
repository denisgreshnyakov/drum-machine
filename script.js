window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const drums = document.querySelectorAll(".drum-pad");
  const display = document.querySelector("#display");
  const powerBtn = document.querySelector("#power");
  const bankBtn = document.querySelector("#bank");
  const volume = document.querySelector(".range");

  const idBankOff = [];
  const audioBankOff = [];
  const idBankOn = [
    "Chord-1",
    "Chord-2",
    "Chord-3",
    "Shaker",
    "Open-HH",
    "Closed-HH",
    "Punchy-Kick",
    "Side-Stick",
    "Snare",
  ];
  const audioBankOn = [
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  ];

  let power = true;
  let bank = false;

  drums.forEach((drum) => {
    idBankOff.push(drum.id);
    audioBankOff.push(drum.children[0].currentSrc);
  });

  drums.forEach((drum) => {
    drum.addEventListener("click", (e) => {
      if (power) {
        play(drum);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (drum.id === checkButton(e.code)) {
        if (power) {
          play(drum);
        }
      }
    });
    drum.addEventListener("animationend", () => {
      drum.classList.remove("push");
    });
  });

  powerBtn.addEventListener("click", () => {
    if (power) {
      powerBtn.style.justifyContent = "flex-start";
      power = !power;
      display.innerHTML = "Power OFF";
    } else {
      powerBtn.style.justifyContent = "flex-end";
      power = !power;
      display.innerHTML = "Power ON";
    }
  });

  bankBtn.addEventListener("click", () => {
    if (bank) {
      bankBtn.style.justifyContent = "flex-start";
      bank = !bank;
      display.innerHTML = "Bank OFF";
      changeBank(drums, idBankOff, audioBankOff);
    } else {
      bankBtn.style.justifyContent = "flex-end";
      bank = !bank;
      display.innerHTML = "Bank ON";
      changeBank(drums, idBankOn, audioBankOn);
    }
  });

  volume.oninput = () => {
    display.innerHTML = `Volume: ${Math.round(100 * volume.value)}`;
  };

  volume.addEventListener("mouseup", () => {
    setTimeout(() => {
      display.innerHTML = "Display";
    }, 100);
  });

  const changeBank = (elements, elemId, audioSrc) => {
    for (let i = 0; i < 9; i++) {
      elements[i].id = elemId[i];
      elements[i].children[0].src = audioSrc[i];
    }
  };

  const play = (drum) => {
    drum.classList.add("push");
    display.innerHTML = drum.id;
    drum.children[0].volume = volume.value;
    drum.children[0].pause();
    drum.children[0].currentTime = 0.0;
    drum.children[0].play();
  };

  const checkButton = (event) => {
    switch (event) {
      case "KeyQ":
        return bank ? "Chord-1" : "Heater-1";
      case "KeyW":
        return bank ? "Chord-2" : "Heater-2";
      case "KeyE":
        return bank ? "Chord-3" : "Heater-3";
      case "KeyA":
        return bank ? "Shaker" : "Heater-4";
      case "KeyS":
        return bank ? "Open-HH" : "Clap";
      case "KeyD":
        return bank ? "Closed-HH" : "Open-HH";
      case "KeyZ":
        return bank ? "Punchy-Kick" : "Kick-n'Hat";
      case "KeyX":
        return bank ? "Side-Stick" : "Kick";
      case "KeyC":
        return bank ? "Snare" : "Closed-HH";
      default:
        return null;
    }
  };
});
