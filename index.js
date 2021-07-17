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

  function loadFoodItems() {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(data => {
      data.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.innerHTML = food.title;
        foodCard.className = "foodCard";
        foodCard.setAttribute('tabIndex', food.id)

        const favBtn = document.createElement('button');
        favBtn.setAttribute('id', food.id);
        favBtn.classList.add(
          "favBtn",
          "p-2",
          "btn",
          "btn-primary"
        )
        favBtn.textContent = "FAV";
        foodCard.appendChild(favBtn);
        foodArea.appendChild(foodCard);
      });
    });
  };

  loadFoodItems();

  
  // const foodBox = document.getElementsByClassName("food-box");
  // const foodCard = document.querySelector('.foodCard');
  // document.addEventListener('click', focusFoodCard);
  // document.addEventListener('blur', leaveFoodCard);

  // Focus to card Function
  // function focusFoodCard(e) {
  //   if(e.target.className === "foodCard") {
  //     e.target.classList.add("borderEffect", "bg-info");
  //     // e.target.focus();
  //     // setTimeout( focusOut(), 2000);
  //     // const allCards = document.querySelectorAll("div.foodCard, .bg-info");
  //     // var i;
  //     // for (i = 0; i < allCards.length; i++) {
  //     // allCards[i].classList.remove("borderEffect", "bg-info");
  //     // }
  //   }
  // };

  // function focusOut(e) {
  //   e.target.classList.remove("borderEffect", "bg-info");
  //   console.log("2 sn geçti")
  // };
  //  Focus Out function
  // function leaveFoodCard(e) {
  //   if(e.target.classList.contains("borderEffect")) {
  //     e.target.classList.remove("borderEffect", "bg-info");
  //   }
  // };

  // const searchInput = document.getElementById('searchInput');

  // searchInput.addEventListener('focusin', (e) => {
  //   e.target.style.background = "red";
  // })