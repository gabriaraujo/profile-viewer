var inpElement = document.querySelector('input');
var btnElement = document.querySelector('button');
var containerElement = document.querySelector('.jumbotron');

var spinnerElement = document.createElement('div');
spinnerElement.className = 'spinner-border text-info';
var loadElement = document.createElement('span');
loadElement.className = 'sr-only';

var listElement = document.createElement('ul');
listElement.className = 'list-group';
containerElement.appendChild(listElement);

axios.interceptors.request.use(config => {
  spinnerElement.appendChild(loadElement);
  containerElement.appendChild(spinnerElement);

  return config;
}, error => {
  return Promise.reject(error);
});

btnElement.onclick = () => {
  axios.get(`https://api.github.com/users/${inpElement.value}/repos`)
    .then(response => {
      listElement.innerHTML = '';
      containerElement.removeChild(spinnerElement);

      for (repo of response.data)
        listItem(repo.name, repo.language);
    })
    .catch(error => {
      listElement.innerHTML = '';
      containerElement.removeChild(spinnerElement);

      if (error.response.status === 404)
        alert('Usuário não encontrado!');
      else
        alert(error.message);
    });

  inpElement.value = '';
}

function listItem(str, num) {
  var itemElement = document.createElement('li');
  var spanElement = document.createElement('span');

  itemElement.className = 
  'list-group-item d-flex justify-content-between align-items-center';
  spanElement.className = 'badge badge-primary badge-pill';

  var textElement = document.createTextNode(str);
  var numElement = document.createTextNode(num);

  spanElement.appendChild(numElement);
  itemElement.appendChild(textElement);
  itemElement.appendChild(spanElement);
  listElement.appendChild(itemElement);
}