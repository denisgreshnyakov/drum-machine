window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const drums = document.querySelectorAll(".drum-pad");
  const display = document.querySelector("#display");

  drums.forEach((drum) => {
    drum.addEventListener("click", (e) => {
      play(drum);
    });
    document.addEventListener("keydown", (e) => {
      if (drum.id === checkButton(e.key)) {
        play(drum);
      }
    });
    drum.addEventListener("animationend", () => {
      drum.classList.remove("push");
    });
  });

  const play = (drum) => {
    drum.classList.add("push");
    display.innerHTML = drum.id;
    drum.children[0].pause();
    drum.children[0].currentTime = 0.0;
    drum.children[0].play();
  };

  const checkButton = (event) => {
    switch (event) {
      case "q":
        return "Heater-1";
      case "w":
        return "Heater-2";
      case "e":
        return "Heater-3";
      case "a":
        return "Heater-4";
      case "s":
        return "Clap";
      case "d":
        return "Open-HH";
      case "z":
        return "Kick-n'Hat";
      case "x":
        return "Kick";
      case "c":
        return "Closed-HH";
      default:
        return null;
    }
  };
});
