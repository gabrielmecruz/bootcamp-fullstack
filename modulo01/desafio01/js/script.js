let inputSearch = null,
    buttonSearch = null,
    panelUsers = null,
    panelData = null,
    users = [];


const formatter = Intl.NumberFormat('pt-br');

window.addEventListener('load', async () => {
    mapElements();
    await fetchUsers();
    addEvents();
})

function mapElements() {
    inputSearch = document.querySelector('#inputSearch');
    buttonSearch= document.querySelector('#buttonSearch');
    panelUsers = document.querySelector('#panelUsers');
    panelData = document.querySelector('#panelData');
}

async function fetchUsers() {
    const result = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    
    const json = await result.json();
    users = json.results.map(({login, name, dob, gender, picture}) => {
        const fullName = `${name.first} ${name.last}`;

        return {
            id: login.uuid,
            name: fullName,
            nameLowerCase: fullName.toLowerCase(),
            age: dob.age,
            gender: gender,
            picture: picture.large,
        };
    }).sort((a,b) => {
        return a.name.localeCompare(b.name);
    });
}

function addEvents() {
    inputSearch.addEventListener('keyup', handleKeyUp);
}

function handleKeyUp(event) {
    const currentKey = event.key;

    if(currentKey !== 'Enter') {
        return;
    }

    const filterText = event.target.value;
    if(filterText.trim() !== '') {
        filterUsers(filterText);
    }
}

function filterUsers(filterText) {
    const filterTextLowerCase = filterText.toLowerCase();

    const filteredUsers = users.filter((user) => {
        return user.nameLowerCase.includes(filterTextLowerCase);
    });

    renderUsers(filteredUsers);
    renderData(filteredUsers);
}

function renderUsers(users) {
    panelUsers.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = `${users.length} usuário(s) encontrado(s)`;

    panelUsers.appendChild(h2);

    const ul = document.createElement('ul');
    users.forEach((user) => {
        const li = document.createElement('li');
        li.classList.add('flex-row');
        
        const img = `<img class="avatar" src="${user.picture}" alt="${user.name}"/>`;
        const userData = `<span>${user.name}, ${user.age} anos`;
        
        li.innerHTML = `${img}${userData}`
        ul.appendChild(li);
    });

    panelUsers.appendChild(ul);
}

function renderData(users) {
    const contMasc = users.filter((user) => user.gender === 'male').length;
    const contFem = users.filter((user) => user.gender === 'female').length;
    const somaIdade = users.reduce((soma, valor) => { return soma + valor.age }, 0);
    const mediaIdade = (somaIdade / users.length) || 0;


    panelData.innerHTML = `
        <h2>Dados</h2>

        <ul>
            <li>Sexo masculino: <strong>${contMasc}</strong></li>
            <li>Sexo feminino: <strong>${contFem}</strong></li>
            <li>Somatório das idades: <strong>${formatNumber(somaIdade)}</strong></li>
            <li>Média das idades: <strong>${formatNumber(mediaIdade)}</strong></li>
        </ul>
    `;
}

function formatNumber(number) {
    return formatter.format(number);
}
