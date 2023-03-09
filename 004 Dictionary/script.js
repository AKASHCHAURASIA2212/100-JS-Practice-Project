let searchBtn = document.querySelector("#search");
let inputBox = document.querySelector("#input");
let resultBox = document.querySelector("#resultBox");

console.log(inputBox);
searchBtn.addEventListener("click", (e) => {
  let word = inputBox.value;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  console.log(url);

  let data = getData(url);
  //   console.log(data);

  data.then((data) => {
    setData(data);
  });
});

async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  //   console.log(data);
  return data;
}

function setData(data) {
  resultBox.innerHTML = "";
  console.log(data);
  if (Array.isArray(data) == false) {
    console.log("data is object");
    let noResultBox = document.createElement("div");
    noResultBox.className = "no_result text-center text-danger";
    noResultBox.innerHTML = `<h3>No Definitions Found</h3>`;
    resultBox.appendChild(noResultBox);
  } else {
    let word = data[0].word;
    let wordDef = data[0].meanings[0].definitions[0].definition;
    let wordEx = data[0].meanings[0].definitions[0].example;
    let audio = "";

    try {
      audio = data[0].phonetics[0].audio;
    } catch (error) {
      console.log("not find error");
    }

    console.log(word);
    console.log(wordDef);
    console.log(wordEx);
    console.log(audio);

    let wordBox = document.createElement("div");
    wordBox.className = "word text-danger text-center text-uppercase px-2 py-1";
    wordBox.innerHTML = `<h1>${word} </h1>`;
    // -> हिंदी ${res.translatedText}
    resultBox.appendChild(wordBox);

    let wordDefBox = document.createElement("div");
    wordDefBox.className = "word_def mb-3";
    wordDefBox.innerHTML = ` <h5 class="text-success font-weight-bolder text-center">${wordDef}</h5>`;
    resultBox.appendChild(wordDefBox);

    if (wordEx) {
      let wordExBox = document.createElement("div");
      wordExBox.className = "word_exa text-center lead";
      wordExBox.innerHTML = `Eg:
      <span class="text-info">${wordEx}</span>
      `;
      resultBox.appendChild(wordExBox);
    }

    if (audio) {
      let AudioBox = document.createElement("div");
      AudioBox.className = "word_aud align-items-center text-center";
      let sound = document.createElement("audio");
      sound.id = "audio-player";
      sound.controls = "controls";
      sound.src = audio;

      AudioBox.appendChild(sound);
      resultBox.appendChild(AudioBox);
    }
  }
}
