const api = axios.create({
  baseURL: 'https://api.github.com/'
});

class Application {
  constructor() {
    this.containerEl = document.querySelector('.jumbotron');
    this.inputEl = document.querySelector('input');
    this.buttonEl = document.querySelector('button');
    this.listEl = document.createElement('ul');

    this.registerHandlers();
  }

  registerHandlers() {
    this.buttonEl.onclick = () => this.search();
    this.inputEl.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.buttonEl.click();
      }
    }) 
  }

  setLoading(loading = true) {
    if (loading) {
      this.listEl.innerHTML = '';

      let spinnerEl = document.createElement('div');
      spinnerEl.setAttribute('id', 'loading');
      spinnerEl.className = 'spinner-border text-info';
      
      let loadingEl = document.createElement('span');
      loadingEl.className = 'sr-only';
      
      spinnerEl.appendChild(loadingEl);
      this.containerEl.appendChild(spinnerEl);

    } else
      document.getElementById('loading').remove();
  }

  async search() {
    const username = this.inputEl.value;
    if (!username) return;

    this.setLoading();
    try {
      const response = await api.get(`users/${username}/repos`);

      this.listEl.className = 'list-group text-justify text-truncate text-wrap';
      this.containerEl.appendChild(this.listEl);

      for (let repo of response.data)
        this.addRepository(repo.name, repo.language);

      this.inputEl.value = '';

    } catch (err) {
      alert('Usuário não encontrado!');
    }

    this.setLoading(false);
  }

  addRepository(name, language) {
    let itemEl = document.createElement('li');
    let spanEl = document.createElement('span');

    itemEl.className = 
    'list-group-item d-flex justify-content-between align-items-center';
    spanEl.className = 'ml-3 badge badge-primary badge-pill';

    let nameEl = document.createTextNode(name);
    let languageEl = document.createTextNode(language);

    spanEl.appendChild(languageEl);
    itemEl.appendChild(nameEl);
    itemEl.appendChild(spanEl);

    this.listEl.appendChild(itemEl);
  }
}

new Application();