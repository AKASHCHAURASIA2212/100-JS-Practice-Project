let refreshBtn = document.querySelector(".refresh-btn");
let container = document.querySelector(".container");
refreshBtn.addEventListener("click", gneratePalete);

function gneratePalete() {
  container.innerHTML = "";
  let maxColor = 24;

  for (let i = 1; i <= maxColor; i++) {
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);

    randomHex = `#${randomHex.padStart(6, 0)}`;
    // console.log(randomHex);

    let colorCont = document.createElement("div");
    colorCont.setAttribute("class", "color-cont");

    colorCont.innerHTML = `
               <div class="color" style="background-color:${randomHex}"></div>
               <div class="text-cont">${randomHex}</div>
              `;

    let textCont = colorCont.querySelector(".text-cont");

    textCont.addEventListener("click", () => copyColor(colorCont, randomHex));

    container.appendChild(colorCont);
  }
}

function copyColor(colorCont, hexColor) {
  //   console.log(colorCont, hexColor);
  let textCont = colorCont.querySelector(".text-cont");
  // copy the hex value changing the text to copied then again change the text after 1 sec
  navigator.clipboard
    .writeText(hexColor)
    .then(() => {
      textCont.innerText = "Copied";

      setTimeout(() => {
        textCont.innerText = hexColor;
      }, 1000);
    })
    .catch(() => {
      console.log("Somthing went wrong !!!!");
    });
}
