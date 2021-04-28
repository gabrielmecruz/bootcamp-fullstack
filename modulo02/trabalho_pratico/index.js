const { resolveSoa } = require("dns");
const { inherits } = require("util");

const fs = require("fs").promises;

init();

async function init() {
    await novoArq();
    await getEstadosMaisMenosCidades(true);
    await getEstadosMaisMenosCidades(false);
    await getCidadeMaiorNome();
    await getCidadeMenorNome();
    await getMaiorCidadeTotal();
}

async function novoArq() {
    let data = await fs.readFile("./files/Estados.json")
    const estados = JSON.parse(data);
    
    data = await fs.readFile("./files/Cidades.json")
    const cidades = JSON.parse(data);
    
    for(state of estados) {
        const stateCities = cidades.filter(city => city.Estado === state.ID);
        await fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(stateCities))
    }
}

async function getContadorCidades(uf) {
    const data = await fs.readFile(`./states/${uf}.json`);
    const cidades = JSON.parse(data);
    return(cidades.length);
}

async function getEstadosMaisMenosCidades(mais) {
    const data = await fs.readFile("./files/Estados.json");
    const estados = JSON.parse(data);

    const listaEstados = [];

    for(state of estados) {
        const qtd = await getContadorCidades(state.Sigla);
        listaEstados.push({UF: state.Sigla, qtd});
    }

    listaEstados.sort((a, b) => {
        if(a.qtd < b.qtd) return 1;
        else if(a.qtd > b.qtd) return -1;
        else return 0;
    });

    const result = [];
    if(mais) {
        listaEstados.slice(0,5).forEach(item => result.push(item.UF + " - " + item.qtd));
        console.log("Mais cidades:");
        console.log(result);
    }else {
        listaEstados.slice(-5).forEach(item => result.push(item.UF + " - " + item.qtd));
        console.log("Menos cidades:");
        console.log(result);
    }
}

async function getMaiorNome(uf){
    const data = await fs.readFile(`./states/${uf}.json`);
    const cidades = JSON.parse(data);

    let maiorNome;

    cidades.forEach(city => {
        if(!maiorNome)
            maiorNome = city;
        else if(city.Nome.length > maiorNome.Nome.length)
            maiorNome = city;
        else if((city.Nome.length === maiorNome.Nome.length) && (city.Nome.toUpperCase() < maiorNome.Nome.toUpperCase()))
            maiorNome = city;
    });

    return maiorNome;
}

async function getCidadeMaiorNome() {
    const data = await fs.readFile(`./files/Estados.json`);
    const estados = JSON.parse(data);

    const maiorCidade = [];

    for(state of estados) {
        const city = await getMaiorNome(state.Sigla);
        maiorCidade.push(city.Nome + " - " + state.Sigla);
    }

    console.log(maiorCidade);
}

async function getMenorNome(uf){
    const data = await fs.readFile(`./states/${uf}.json`);
    const cidades = JSON.parse(data);

    let menorNome;

    cidades.forEach(city => {
        if(!menorNome)
            menorNome = city;
        else if(city.Nome.length < menorNome.Nome.length)
            menorNome = city;
        else if((city.Nome.length === menorNome.Nome.length) && (city.Nome.toUpperCase() < menorNome.Nome.toUpperCase()))
            menorNome = city;
    });

    return menorNome;
}

async function getCidadeMenorNome() {
    const data = await fs.readFile(`./files/Estados.json`);
    const estados = JSON.parse(data);

    const menorCidade = [];

    for(state of estados) {
        const city = await getMenorNome(state.Sigla);
        menorCidade.push(city.Nome + " - " + state.Sigla);
    }

    console.log(menorCidade);
}

async function getMaiorCidadeTotal() {
    let data = await fs.readFile(`./files/Cidades.json`);
    const cidades = JSON.parse(data);

    let maiorCidade;

    cidades.forEach(state => {
        if(!maiorCidade)
            maiorCidade = state;
        else if(state.Nome.length > maiorCidade.Nome.length)
            maiorCidade = state;
        else if((state.Nome.length === maiorCidade.Nome.length) && (state.Nome.toUpperCase() < maiorCidade.Nome.toUpperCase()))
            maiorCidade = state;
    });
    console.log(`Nome: ${maiorCidade.Nome} - UF: ${maiorCidade.Estado}`);
}