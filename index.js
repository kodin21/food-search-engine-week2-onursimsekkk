import 'regenerator-runtime/runtime'
import Fuse from 'fuse.js'

const user = document.getElementById('user-info');

// Fetch User Info
fetch("https://jsonplaceholder.typicode.com/users/1").then(
  response => response.json()
  ).then(data => {
    const userName = document.createElement('div');
    userName.textContent = `Hello, ${data.name}`;
    userName.setAttribute('id', 'userName');
    user.appendChild(userName);
  });

  const foodArea = document.getElementById('food-box');
  let foodArray = [];
  let favArray = [];

  async function loadFoodItems() {
    await fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(data => {
      data.map(food => {
        
        foodArray.push(food); 
        // push(food.forEach(item => ())) 
      
      });
    });
  };

  // Food Card 
  function createCards() {
    foodArray.forEach(food => {

      const foodCard = document.createElement('div');

      foodCard.innerHTML = food.title;
      foodCard.className = "foodCard";
      foodCard.setAttribute('tabIndex', food.id);

      // Favorite Button
      const favBtn = document.createElement('i');
      favBtn.setAttribute('id', food.id);
      favBtn.classList.add(
        "far",
        "fa-star",
        "myFavBtn",
        "p-2"
      );

      favArray.forEach(favItem => {
        if(favItem.id === food.id) {
          favBtn.classList.remove('far');
          favBtn.classList.add('fas');
        }
      });

      foodCard.appendChild(favBtn);
      foodArea.appendChild(foodCard);
    })
  };

function favToggle() {
  let favBtn = document.querySelectorAll('.myFavBtn');

  favBtn.forEach(btn => btn.addEventListener('click', (e) => {
    
    let selectedItem = foodArray[e.target.id - 1];

    // console.log(btn.className)
    if(btn.className.includes("fas")){
      let deletedFavItem = {}; 
      btn.classList = "far fa-star myFavBtn p-2";
     
      favArray.forEach(food => {
        if(food.id == selectedItem.id) {
          console.log("eşleşti")
          deletedFavItem = food;
        }
      });      
      let index = favArray.indexOf(deletedFavItem);
      favArray.splice(index, 1);
      
      localStorage.setItem('favArray', JSON.stringify(favArray));
    } else if(btn.className.includes("far")) {
      btn.classList = "fas fa-star myFavBtn p-2";
      console.log("eklendi")
      favArray.push(selectedItem);

      localStorage.setItem('favArray', JSON.stringify(favArray));
    }
  }));
};

  async function renderApp() {
    favArray = JSON.parse(localStorage.getItem("favArray")) || [];
    await loadFoodItems();

    createCards();

    favToggle();
  
  }

  renderApp();
