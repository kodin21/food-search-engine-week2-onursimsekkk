import 'regenerator-runtime/runtime'
// const root = document.querySelector('#js-root');
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
        // Food Card 
        foodArray.push(food); 
      });
    });
  };
  
  function createCards() {
    foodArray.forEach(food => {
      const foodCard = document.createElement('div');
      foodCard.innerHTML = food.title;
      foodCard.className = "foodCard";
      foodCard.setAttribute('tabIndex', food.id)
      // food.completed ? foodCard.classList.add('bg-info') : ""; 

      // Favorite Button
      const favBtn = document.createElement('i');
      favBtn.setAttribute('id', food.id);
      favBtn.classList.add(
        "far",
        "fa-star",
        "myFavBtn",
        "p-2"
      );

      foodCard.appendChild(favBtn);
      foodArea.appendChild(foodCard);
    })
  };

  function setAllFoodsNoFav() {
    foodArray.forEach(food => {
      food.completed = false;
    }
)};

function favToggle() {
  let favBtn = document.querySelectorAll('.myFavBtn');
  favBtn.forEach(btn => btn.addEventListener('click', (e) => {
    
    let selectedItem = foodArray[e.target.id - 1];
    selectedItem.completed = !selectedItem.completed;

    if(selectedItem.completed === true) {
      console.log("eklendi")
      favArray.push(selectedItem);
      console.log(favArray);
    } else {
      let deletedFavItem = {}; 
      favArray.forEach(food => {
        if(food.id == selectedItem.id) {
          console.log("eşleşti")
          deletedFavItem = food;
        }
      });      
      let index = favArray.indexOf(deletedFavItem);
      favArray.splice(index, 1);
      console.log(favArray);
    }
  }));
};

  async function renderApp() {
    await loadFoodItems();

    setAllFoodsNoFav();

    createCards();

    favToggle();
    // console.log(foodArray);
  }

  renderApp();
