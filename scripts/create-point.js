// Função para ordenar os objetos pelo atributo nome
function ordenarPorNome(a, b){
  return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
}

function minhaPromisse(url, campo) {
  fetch(url)
  .then( res => res.json() )
  .then( objects => {
    for( const object of objects.sort(ordenarPorNome)) {
      // escreve no document os dados
      campo.innerHTML += `<option value="${object.id}">${object.nome}</option>`
    }
  })
}

// função que faz requisição api no cadastro de ufs e popula o campo de select
function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  minhaPromisse("https://servicodados.ibge.gov.br/api/v1/localidades/estados", ufSelect);
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

  minhaPromisse(url, citySelect);

  citySelect.disabled = false;
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)
