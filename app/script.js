MyReceipes = [];

function makerecipeDiv(recipe) {
  const div = document.createElement("div");
  div.setAttribute("class", "receipe-card");
  div.setAttribute("id", `recipe-${recipe.id}`);
  const flexDiv = document.createElement("div");
  flexDiv.setAttribute("class", "flex-card");

  const headDiv = document.createElement("div");
  headDiv.setAttribute("class", "head-card");
  const imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "img-card");

  const h1 = document.createElement("h1");
  h1.innerText = recipe["title"];

  const h2 = document.createElement("h2");
  h2.innerText = changeTimeFormat(recipe["time"]);

  const h3 = document.createElement("h3");
  h3.innerText = recipe["step"];
  const img = document.createElement("img");
  img.setAttribute("class", "receipe-img");
  img.src = recipe["image"];

  const btn = document.createElement("button");
  btn.setAttribute("class", "btn");
  btn.innerText = "Delete";
  btn.addEventListener("click", function () {
    removenotes(recipe["id"]);
  });

  div.appendChild(h1);
  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(img);
  div.appendChild(btn);
  div.appendChild(headDiv);
  div.appendChild(imgDiv);
  div.appendChild(flexDiv);
  headDiv.appendChild(h1);
  headDiv.appendChild(h2);
  headDiv.appendChild(h3);
  imgDiv.appendChild(img);
  flexDiv.append(headDiv);
  flexDiv.appendChild(imgDiv);
  div.appendChild(btn);

  return div;
}
function appendToReceipe(recipeDiv) {
  const app = document.querySelector("#myrecipe-notes-id");
  app.appendChild(recipeDiv);
}

function recipeform() {
  let form = document.querySelector("#receipe-form-id");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let receipetitle = document.querySelector("#receipe-title-id").value;
    let receipet = document.querySelector("#receipe-time-id").value;
    // let receipetime = receipet[0] + "hr" + "-" + receipet[1] + "min";
    let receipestep = document.querySelector("#receipe-step-id").value;
    let receipeimage = document.querySelector("#receipe-image-id").value;
    const recipe = {
      id: new Date().getTime(),
      title: receipetitle,
      time: receipet,
      step: receipestep,
      image: receipeimage,
    };
    addSteps(recipe);
    form.reset();
    showUI();
    console.log(receipetime);
  });
}

function addSteps(receipe) {
  MyReceipes.push(receipe);
  timesort();
  saveToLocalStorage();
  showUI();
}
function removenotes(receipeId) {
  console.log("Deleting ", receipeId);
  const filteredArray = MyReceipes.filter((receipe) => receipe.id != receipeId);
  MyReceipes = filteredArray;
  saveToLocalStorage();
  showUI();
}
function saveToLocalStorage() {
  const str = JSON.stringify(MyReceipes);
  localStorage.setItem("my-receipes-list", str);
}

function getFromLocalStorage() {
  const str = localStorage.getItem("my-receipes-list");
  if (!str) {
    MyReceipes = [];
  } else {
    MyReceipes = JSON.parse(str);
  }
}
function timesort() {
  MyReceipes.sort(function (a, b) {
    let atime = a["time"].split(":");
    let btime = b["time"].split(":");
    return (
      new Date(2023, 8, 15, atime[0], atime[1]) -
      new Date(2023, 8, 15, btime[0], btime[1])
    );
  });
}

function clearApp() {
  const app = document.querySelector("#myrecipe-notes-id");
  app.innerHTML = "";
}
function showUI() {
  clearApp();
  for (let i = 0; i < MyReceipes.length; i++) {
    const receipeDiv = makerecipeDiv(MyReceipes[i]);
    appendToReceipe(receipeDiv);
  }
  ordervalidate();
}

function ordervalidate() {
  const total = document.querySelector("#order-no");
  total.innerHTML = "Total No: " + MyReceipes.length;
  if (MyReceipes.length != 0) {
    total.setAttribute("class", "green");
  } else {
    total.setAttribute("class", "red");
  }
}

function changeTimeFormat(time) {
  const changeTime = time.split(":");
  const hr = changeTime[0];
  const mn = changeTime[1];
  let timeFormat = "";
  if (hr != 0) {
    timeFormat += `${hr} Hrs`;
  }
  if (mn != 0) {
    timeFormat += ` ${mn} Mins`;
  }
  return timeFormat.trim();
}
getFromLocalStorage();
recipeform();
showUI();

/**  alternate way to validate no.of .orders */

// function validate() {
//   let x = JSON.parse(localStorage.getItem("my-receipes-list")).length;
//   if (x < 1) {
//     let order0 = document.querySelector("#order");
//     order0.style.display = "block";
//   } else {
//     document.querySelector("#oder-no").innerHTML = "no.of.orders" + x;
//     console.log(x);
//   }
// }

// function timeneglect() {
//   let receipet = document.querySelector("#receipe-time-id").value.split(":");
//   if ((receipet[0] = 0)) {
//     receipet[0] + ""
//   } else if ((receipet[1] = 0)) {
//     receipet[1] = "";
//   } else {
//     receipet[0] + "hr" + "-" + receipet[1] + "min";
//   }
// }
