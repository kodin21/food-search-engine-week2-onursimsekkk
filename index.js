const root = document.querySelector('#js-root');
const user = document.getElementById('user-info');

fetch("https://jsonplaceholder.typicode.com/users/1").then(
  response => response.json()
  ).then(responseJson => {
    const userName = document.createElement('div');
    userName.textContent = `Hello, ${responseJson.name}`;
    userName.setAttribute('id', 'userName');
    user.appendChild(userName);
  });


