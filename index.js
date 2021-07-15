const root = document.querySelector('#js-root');
const user = document.getElementById('user-info');

// Fetch User Info
fetch("https://jsonplaceholder.typicode.com/users/1").then(
  response => response.json()
  ).then(responseJson => {
    const userName = document.createElement('div');
    userName.textContent = `Hello, ${responseJson.name}`;
    userName.setAttribute('id', 'userName');
    user.appendChild(userName);
  });

  // const searchArea = document.getElementById('search');
  const foodArea = document.getElementById('food-box');

  function loadFoodItems() {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(responseJson => {
      responseJson.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.innerHTML = food.title;
        foodCard.className = "foodCard";

        const favBtn = document.createElement('button');
        favBtn.setAttribute('id', food.id);
        favBtn.classList.add(
          "favBtn",
          "p-2",
          "btn",
          "btn-primary"
        )
        favBtn.textContent = "FAV"
        foodCard.appendChild(favBtn);
        foodArea.appendChild(foodCard);
      });
    });
  };

  loadFoodItems();
  // function newElement() {
  //   const newEl = document.createElement('button');
  //   newEl.textContent = "Bana Tıkla";
  //   newEl.setAttribute('id', 'sendBtn');
  //   searchArea.appendChild(newEl);
  // };
  // newElement();
  
  // document.addEventListener('click', (e) => {
  //   if(e.target.id === "sendBtn") {
  //     console.log("Butona tıklandı");
  //   }
  // });
