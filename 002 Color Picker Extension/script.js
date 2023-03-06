const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors")) || [];

console.log("initially -> " + pickedColors.length);
function showColors() {
  if (!pickedColors.length) return;
  colorList.innerHTML = pickedColors
    .map(
      (color) =>
        `<li class="color">
         <span class="rect" style="background:${color}"></span>
         <span class="value" data-color="${color}">${color}</span>
      </li>`
    )
    .join("");
  // generating li for the picked color and adding it to the colorlist
  document.querySelector(".picked-colors").classList.remove("hide");
  document.querySelectorAll(".color").forEach((li) => {
    li.addEventListener("click", (e) =>
      copyColor(e.currentTarget.lastElementChild)
    );
  });

  console.log(liTag);
}

function copyColor(elem) {
  console.log(elem);
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerText = "Copied";
  setTimeout(() => {
    elem.innerText = elem.dataset.color;
  }, 1000);
}
async function activateEyeDroper() {
  try {
    const eyeDropper = new EyeDropper();

    const { sRGBHex } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);

    // adding a color to list if it not exist
    if (!pickedColors.includes(sRGBHex)) {
      pickedColors.push(sRGBHex);
      localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
      showColors();
    }
  } catch (error) {
    console.log("Somthing went wrong !!!! " + error);
  }
}

function clearAllColor() {
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  colorList.innerHTML = "";
  document.querySelector(".picked-colors").classList.add("hide");
}

colorPickerBtn.addEventListener("click", activateEyeDroper);
clearAll.addEventListener("click", clearAllColor);
