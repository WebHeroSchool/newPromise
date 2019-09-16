const preload = document.querySelector('.preload');
const information = document.querySelector('.information');
const params = new URLSearchParams(window.location.search);
let userName = params.get(`username`);
let date = new Date;
let dateInfo;

const getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject('error!'), 1000);
});

const getUserName = new Promise((resolve, reject) => {
    setTimeout (() => userName ? resolve(userName) : reject('not found!'), 3000);
});

const preloader = setTimeout(() => {
    preload.classList.toggle('hidden');
    information.classList.toggle('hidden');
}, 3000);

  if(params.has(`username`) && userName !== ``) {
    Promise.all([getDate, getUserName])
    .then(([date, userName]) => {
        dateInfo = date;
        return fetch(`https://api.github.com/users/${userName}`);
    })
      .then(response => response.json())
      
      .then(json => {
        if (json.message == 'Not Found') {
          let div = document.createElement('div');
          div.innerHTML =  'Информация о пользователе отсутствует';
          information.appendChild(div);
          div.style.fontSize = "30px";
        } else {
            let nickName = document.createElement('a');
            nickName.setAttribute('href', json.html_url);
            nickName.innerHTML = json.name;
            information.appendChild(nickName);
            nickName.style.fontSize = "40px";

            let userInfo = document.createElement('div');
            userInfo.innerHTML = json.bio;
            information.appendChild(userInfo);

            let avatar = document.createElement('img');
            avatar.setAttribute('src', json.avatar_url);
            information.appendChild(avatar);

            let newDate = document.createElement('div');
            newDate.innerHTML = dateInfo;
            information.appendChild(newDate);
        }
      })
  } else {
      let div = document.createElement('div');
      div.innerHTML = 'Введите данные в URL';
      information.appendChild(div);
      div.style.fontSize = "40px";
  }
