let tableUsers = document.querySelector('.table-users-body');
let input = document.querySelector('.input')

// Url de l'Api avec des paramètres supplémentaires pour filtrer les données
let url: string = 'https://randomuser.me/api/';
let params: string = '?results=50&nat=fr';

let dataArray;

try {
    async function getUsers() {
        let res = await fetch(`${url}${params}`).then(response => response.json()).then(data => {
            // console.log(data.results);
            let results = data.results;
            console.log("🚀 ~ file: script.js:11 ~ fetch ~ data", results)

            // Fonction de tri par ordre alphabétique
            dataArray = orderList(results);
            console.log("🚀 ~ file: script.ts:21 ~ res ~ dataArray:", dataArray)

            // Création de la liste des users 
            createUserList(dataArray);

        })
    }
} catch (err) {}

getUsers();

function orderList(results) {
    const orderResults = results.sort((a, b) => {
        if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
            return -1;
        } else if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    })

    return orderResults;
}

// Fonction map à travers dataArray pour récupérer chaque personne et création des éléments pour les données qui nous intéressent 
function createUserList(dataArray) {
    dataArray.map(person => {
        let personId: {
            [key: string]: string
        } = person.name;

        let img: string = person.picture.thumbnail;
        let prenom: string = personId.first;
        let nom: string = personId.last;
        let email: string = person.email;
        let phone: string = person.cell;

        let div = document.createElement('div');
        div.classList.add('table-users-row');
        tableUsers.appendChild(div);

        let userName = document.createElement('span');
        userName.classList.add('user-item');
        userName.classList.add('name');
        userName.innerHTML = `<img src="${img}" alt="${prenom} ${nom}" />${prenom} ${nom}`;
        div.appendChild(userName);

        let userMail = document.createElement('span');
        userMail.classList.add('user-item');
        userMail.classList.add('email');
        userMail.innerText = `${email}`;
        div.appendChild(userMail);

        let userPhone = document.createElement('span');
        userPhone.classList.add('user-item');
        userPhone.innerText = `${phone}`;
        div.appendChild(userPhone);

    })
}


input?.addEventListener("input", filterData);

// Fonction qui sert à filtrer les users en fonction de la recherche 
function filterData(e) {

    // On vide d'abord le tableau des users 
    tableUsers.innerHTML = '';

    // .replace pour supprimer les espaces 
    const search: string = e.target.value.toLowerCase().replace(/\s/g, '');

    // On récupère le dataArray et on regarde si des élèments contiennent search 
    const filteredList = dataArray.filter(el => el.name.last.toLowerCase().includes(search) ||
        el.name.first.toLowerCase().includes(search) || `${el.name.last + el.name.first}`.toLowerCase().replace(/\s/g, '').includes(search) || `${el.name.first + el.name.last}`.toLowerCase().replace(/\s/g, '').includes(search));

    createUserList(filteredList);
}
