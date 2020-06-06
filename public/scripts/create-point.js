// ordena os objetos pelo atributo nome
function ordenarPorNome(a, b){
  return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
}

// faz a requisição na api e constroi os elementos options
function createOption(url, campo) {
  fetch(url)
  .then( res => res.json() )
  .then( objects => {
    for( const object of objects.sort(ordenarPorNome)) {
      campo.innerHTML += `<option value="${object.id}">${object.nome}</option>`
    }
  })
}

function populateUfs() {
  const ufSelect = document.querySelector("select[name=idState]");
  createOption("https://servicodados.ibge.gov.br/api/v1/localidades/estados", ufSelect);
}
populateUfs();

function populateCities(){
  const citySelect = document.querySelector("select[name=idCity]");
  const stateInput = document.querySelector("input[name=nameState]");
  const cityInput = document.querySelector("input[name=nameCity]")
  const ufValue = event.target.value; // pega o id do municipio
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  
  // pega o nome do estado selecionado e coloca no elemento input para ser enviado pelo formulárop
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  // pega o nome da cidade selecionada e coloca no elemento input para ser enviado pelo formulario
  citySelect.addEventListener("change", function(){
    const indexOfSelectedCity = event.target.selectedIndex;
    cityInput.value = event.target.options[indexOfSelectedCity].text;
  })

  // reseta o valor do elemento select
  citySelect.innerHTML = `<option value="">Selectione a Cidade</option>`;
  citySelect.disabled = true;

  // chama api e popula elemento select
  createOption(url, citySelect);

  // habilita o campo para seleção
  citySelect.disabled = false;
}

// adiciona evento change ao campo seleção de estado
document
  .querySelector("select[name=idState]")
  .addEventListener("change", populateCities)


const itemsToCollected = document.querySelectorAll(".items-grid li")
const collectedItems = document.querySelector("input[name=items]")


// adiciona evento de clique nos itens da lista
for (const item of itemsToCollected) {
  item.addEventListener("click", handleSelectedItem)
}

// array vazio que vai ser preenchido com os itens selecionados
let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  const itemId = itemLi.dataset.id

  // adiciona/remove classe do elemento
  itemLi.classList.toggle("selected")

  // verifica se existem itens selecionados, se sim
  // pega os itens selecionados
  // retona o index onde foi encontrado o valor e caso nao encontre retornar -1
  const alreadySelected = selectedItems.findIndex( item => item == itemId )
  
  // se já tiver selecionado, tira da selecao
  if (alreadySelected >= 0){
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
    selectedItems.push(itemId)
  } 
  collectedItems.value = selectedItems
}