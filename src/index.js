const API_URL = ' http://127.0.0.1:5500/games.json' // use your localhost url 
//querying
const input = document.getElementById("search-input");
const form = document.getElementById("search-form");
const ul = document.createElement('ul');
const container = document.getElementById('games-holder')
const options = document.getElementById('platform-select')
container.appendChild(ul)
let allGames;
let pValue = '';

//first time when you visit the website it will show you all the games available 
 
document.addEventListener('DOMContentLoaded', (event) => {
    fetch(API_URL).then(resp=>resp.json()).then(data => {allGames = data;createList(fillteredData(pValue, "-1"));}).catch(err=>console.log(err))
    
});
// fetching api for data 
fetch(API_URL).then(resp=>resp.json()).then(data => {allGames = data}).catch(err=>console.log(err))
//using form submit to show data 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    createList(fillteredData(input.value, options.value))
    pValue = input.value;
    form.reset();
})

// this function filter the api data according to the input data 
let fillteredData = (input, optionValue)=>{
    let selectedGame
    if (optionValue === "-1")
    selectedGame = allGames.filter(game=>{
        return game.name.toLowerCase().includes(input.toLowerCase()) 
    });
    else 
        selectedGame = allGames.filter(game=>{
        console.log(game.platforms.includes(parseInt(optionValue)));
        if(game.name.toLowerCase().includes(input.toLowerCase()) && game.platforms.includes(parseInt(optionValue)))  
            return true;
    });
    console.log(selectedGame)
    return selectedGame;
}
let createList = (datas)=>{
    ul.innerHTML = ''

    datas.forEach(data=>{
        const li = document.createElement('LI')
        li.innerHTML = `
        <h1>${data.name}</h1>
        <ul>
            <li>${data.id}</li>
            <li>${data.platforms}</li>
        </ul>`
        ul.appendChild(li)
    }) 
}
//you can change the platforms and then it will return all the games for this platform if you didn't type anything in the search bar 
//if you specify the platporm and type some thing in the search bar it will return all the games for that that platfotm that contain this text
options.addEventListener('change', element=>{
    let value = element.target.value;
    console.log(value);
    console.log(pValue);
    createList(fillteredData(pValue, value))

})