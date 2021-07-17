import "regenerator-runtime/runtime";
import Fuse from "fuse.js";

const user = document.getElementById("user-info");
const searchInput = document.getElementById("searchInput");

// Fetch User Info
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((data) => {
    const userName = document.createElement("div");
    userName.textContent = `Hello, ${data.name}`;
    userName.setAttribute("id", "userName");
    user.appendChild(userName);
  });

const foodArea = document.getElementById("food-box");
let foodArray = [];
let favArray = [];
let resultsArray = [];

// Fetch Food Info
async function loadFoodItems() {
  await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      data.map((food) => {
        foodArray.push(food);
      });
    });
};


// Debounce
const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Input Event
searchInput.addEventListener("input", debounce(searchFuse, 800));
// Fuse Function
function searchFuse() {
  const fuseOptions = {keys: ["title"] };
  const fuse = new Fuse(foodArray, fuseOptions);
  const searchValue = fuse.search(searchInput.value);

  resultsArray = searchValue.map(result => result.item);
  createCards(resultsArray);
};

// Food Card
function createCards(resultsArray) {
  foodArea.innerHTML = "";

  resultsArray.forEach((food) => {
    const foodCard = document.createElement("div");

    foodCard.innerHTML = food.title;
    foodCard.className = "foodCard";
    foodCard.setAttribute("tabIndex", food.id);

    // Favorite Button
    const favBtn = document.createElement("i");
    favBtn.setAttribute("id", food.id);
    favBtn.classList.add("far", "fa-star", "myFavBtn", "p-2");

    favArray.forEach((favItem) => {
      if (favItem.id === food.id) {
        favBtn.classList.remove("far");
        favBtn.classList.add("fas");
      }
    });

    foodCard.appendChild(favBtn);
    foodArea.appendChild(foodCard);
  });
};

function favToggle() {
  let favBtn = document.querySelectorAll(".myFavBtn");

  favBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      let selectedItem = foodArray[e.target.id - 1];

      // console.log(btn.className)
      if (btn.className.includes("fas")) {
        let deletedFavItem = {};
        btn.classList = "far fa-star myFavBtn p-2";

        favArray.forEach((food) => {
          if (food.id == selectedItem.id) {
            deletedFavItem = food;
          }
        });
        let index = favArray.indexOf(deletedFavItem);
        favArray.splice(index, 1);

        localStorage.setItem("favArray", JSON.stringify(favArray));
      } else if (btn.className.includes("far")) {
        btn.classList = "fas fa-star myFavBtn p-2";
        favArray.push(selectedItem);

        localStorage.setItem("favArray", JSON.stringify(favArray));
      }
    })
  );
}

async function renderApp() {
  favArray = JSON.parse(localStorage.getItem("favArray")) || [];
  await loadFoodItems();

  createCards(foodArray);

  favToggle();
}

renderApp();
