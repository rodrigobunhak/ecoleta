// Função para ordenar os objetos pelo atributo nome
function ordenarPorNome(a, b){
    return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
  }

// função que faz requisição api no cadastro de ufs e popula o campo de select
function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  // Promisse responsável por solicitar e tratar dados da api
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {
    for( const state of states.sort(ordenarPorNome)) {
      // escreve no document os dados
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUfs();

function getCities(){
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "";

  fetch(url)
  .then( res => res.json() )
  .then( cities => {
    for( const city of cities.sort(ordenarPorNome)) {
      citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
    }
  })
  citySelect.disabled = false;
}



document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)
