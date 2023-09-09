// import { connection } from "mongoose";

var addFact = document.querySelector(".add-facts-button");
var addFactSec = document.querySelector(".add-icon");
var formContainer = document.querySelector(".form-container");
var factText = document.querySelector("#fact-input");
var numWords = document.querySelector("#num-words");
var numWordsInt = parseInt(numWords.textContent);
var form = document.forms.form;
// var clickD = [false, false, false];
// localStorage.setItem("click", JSON.stringify(clickD));

// console.log(JSON.parse(localStorage.getItem("click")));

// const axios = require("axios");
// console.log(factText.value.length);
// console.log(addFact);
// console.log(url)
// fetch( url).then((res)=>{return res.json()})
// .then((data)=>{
//   data.forEach(element => {
//     console.log(element) ;
//     const markUp = `<li class="single-fact">
//     <div class="fact-content">
//       <div class="fact-text-source">
//       <span>
//       ${element.factText}
//       <a href="${element.source}" class="fact-source">( Source )</a>
//       </span>
//       </div>
//       <div class="color-blue fact-cat">
//         <span class="">${element.category}</span>
//       </div>
//     </div>
//     <div class="rxn-container">
//       <div class="good-rxn"><button>👍 ${element.numOfLikes[0]}</button></div>
//       <div class="mind-blowing-rxn"><button>🤩 ${element.numOfLikes[1]}</button></div>
//       <div class="disputed-rxn"><button>👎 ${element.numOfLikes[2]}</button></div>
//     </div>
//   </li>` ;
//   document.querySelector(".fact-list").insertAdjacentHTML("beforeend" , markUp);
//   });
// }) ;

addFact.addEventListener("click", function (e) {
  if (addFact.textContent === "Close") {
    // console.log("its me");
    addFact.textContent = "Share A Fact";
  } else {
    addFact.textContent = "Close";
  }
  formContainer.classList.toggle("form-invisible");
});

addFactSec.addEventListener("click", function (e) {
  if (formContainer.classList.contains("form-invisible")) {
    // console.log("its me");
    addFactSec.name = "close-outline";
  } else {
    addFactSec.name = "add-outline";
  }
  formContainer.classList.toggle("form-invisible");
});

factText.addEventListener("input", function (e) {
  if (numWordsInt - factText.value.length < 0) {
    document.querySelector(".form-button").disabled = true;
    // factText.disabled = true;
    e.preventDefault();
    alert("Please Enter Within Word Limit");
  } else {
    document.querySelector(".form-button").disabled = false;
    numWords.textContent = numWordsInt - factText.value.length;
  }
});

// function like(fact) {
//   console.log(typeof JSON.parse(fact));
// }

async function like(factObj, num) {
  // let btn = e.target;
  // console.log(fact.split(","));
  fact = JSON.parse(factObj);
  var isClicked = [false, false, false];
  var divEl = document.querySelectorAll(`.b${fact._id}`);
  var numLikes = [];

  for (let i = 0; i < divEl.length; i++) {
    numLikes.push(
      Number(document.querySelector(`#s${fact._id}${i}`).textContent)
    );
  }
  // var numLikes = divEl.map((div) => Number(div.textContent));
  let click = JSON.parse(localStorage.getItem(`${fact._id}`));
  // var url = new URL("http://127.0.0.1:3001");
  var url = new URL(window.location.href);
  // console.log("#" + fact._id + "b0");
  url.searchParams.append("factId", fact._id);

  if (click) {
    if (click[num]) {
      return;
    }
    for (var i = 0; i < click.length; i++) {
      if (click[i]) {
        numLikes[i] = numLikes[i] - 1;
        divEl[i].classList.remove("clicked");
        click[i] = false;
      }
    }
    numLikes[num] += 1;
    divEl[num].classList.add("clicked");
    click[num] = true;

    localStorage.setItem(`${fact._id}`, JSON.stringify(click));
  } else {
    numLikes[num] = numLikes[num] + 1;
    isClicked[num] = true;

    document.querySelector(`#s${fact._id}${num}`).textContent = numLikes[num];
    divEl[num].classList.add("clicked");
    localStorage.setItem(`${fact._id}`, JSON.stringify(isClicked));
  }

  for (var j = 0; j < numLikes.length; j++) {
    document.querySelector(`#s${fact._id}${j}`).textContent = numLikes[j];
  }

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      numLikes: numLikes,
    }),
  });
  const data = await res.json();

  if (data.disputed) {
    document.querySelector(`#dis${fact._id}`).classList.remove("display-none");
  } else {
    document.querySelector(`#dis${fact._id}`).classList.add("display-none");
  }
}

// async function filterBtn(name) {
//   var url = new URL("http://127.0.0.1:3001/");
//   url.searchParams.append("category", name);
//   console.log("functioned called");
//   await fetch(url);
// }
// function filterBtn(name) {
//   console.log(name);
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let formSubmit = e.target;

//   var formData = formSubmit.elements;
//   const factText = formData.namedItem("factText");
//   const factSource = formData.namedItem("factSource");
//   const factCategory = formData.namedItem("factCategory");

//   console.log(factText.value);
//   console.log(factSource.value);
//   console.log(factCategory.value);

//   fetch("http://127.0.0.1:3001/facts", {
//     method: "POST",
//     body: JSON.stringify({
//       factText: factText.value,
//       factSource: factSource.value,
//       factCategory: factCategory.value,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// });

// function filterBtn(name) {
//   console.log(name);
// }

// media query manipulation...

var mediaMd = matchMedia("(max-width: 688px)");
myFunc(mediaMd);
mediaMd.addEventListener("change", myFunc);

function myFunc(el) {
  if (el.matches) {
    // smartphone/iphone... maybe run some small-screen related dom scripting?
    addFactSec.classList.remove("display-none");
    addFact.classList.add("display-none");

    // console.log(addFactSec);
  } else {
    addFactSec.classList.add("display-none");
    addFact.classList.remove("display-none");
  }
}

function displayClicked() {
  for (var i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let isClk = JSON.parse(localStorage.getItem(key));
    let divLst = document.querySelectorAll(`.b${key}`);

    if (divLst) {
      for (var j = 0; j < isClk.length; j++) {
        if (isClk[j]) {
          divLst[j]?.classList.add("clicked");
        }
      }
    }
  }
}

displayClicked();
