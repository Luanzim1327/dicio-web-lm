let word = "";

const form = document.querySelector("form");

const containerSearch = document.getElementById("container-search");
const containerContentWord = document.getElementById("container-content-word");
const containerSynonymsWord = document.getElementById("container-word-synonyms");

const openingWords = ["Comer" , "Carro" , "Futebol" , "Criança" , "Amor" , "Tristeza" , "Fugir" , "Unir"];

function searchWordInApi (e) {
    e.preventDefault();
    word = form.querySelector("input").value;
    getWordInApi(word);
    getWordSynonyms(word);
}

function renderWordLoaded () {
    let numRandom = Math.floor(Math.random() * openingWords.length);

    getWordInApi(openingWords[numRandom]);
}



function getWordInApi (word) {
    fetch(`https://dicio-api-ten.vercel.app/v2/${word}` , {method : "get"})
    .then(res => res.json())
    .then((data) => {
        createInterfaceMeanWord(word , data[0].meanings)
        getWordSynonyms(word);
    });
}

function getWordSynonyms (word) {
    let arraySynonyms = [];

    fetch(`https://dicio-api-ten.vercel.app/v2/sinonimos/${word}` , {method : "get"})
    .then(res => res.json())
    .then((data) => {
        arraySynonyms = [...data];
        createInterfaceSynonymsWord(arraySynonyms);
    });

}

function createInterfaceMeanWord (wordName , meanWord) {
    let indexMean = 1;
    containerSearch.innerHTML = 
    `
        <h2>${wordName}</h2>
        <p>Você pesquisou por : '${wordName}'</p>
    `
    containerContentWord.innerHTML = `
        <h3>Significados : </h3>
    ` +
    `<ul>` +
    meanWord.map((mean) => {
        return  `<li> ${indexMean++} - ${mean}</li>`
    }).join("") +
    `</ul>`
};

function createInterfaceSynonymsWord (synonyms) {
    let indexSynonyms = 1;

    if(synonyms.length !== 0) {
        return containerSynonymsWord.innerHTML =
        `
        <h2>Sinonimos : </h2>
        ` 
        +
        `<ul>` 
        +
        synonyms.map((syn) => {
            return `<li> ${indexSynonyms++} - ${syn} </li>`
        }).join("")  
        +
        `</ul>`
    } else {
        return containerSynonymsWord.innerHTML = ` 
            <h2>Em nossos bancos de dados essa palavra não tem sinônimos</h2>
            <p>Se quiser nos ajudar a encontrar sinônimos clique em <a href="https://www.sinonimos.com.br/contato.php?a=s">Sugerir sinônimo</a></p>   
    `
    }
}


document.addEventListener("DOMContentLoaded" , renderWordLoaded);
form.addEventListener("submit" , searchWordInApi);
