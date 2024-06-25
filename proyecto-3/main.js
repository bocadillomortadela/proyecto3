import './style.css'
import { headerCreate } from './src/components/header/header'
import { displayImages as displayImagesFromCards } from './src/components/cards/cards'

const divapp = document.querySelector('#app')
const header = headerCreate()
divapp.appendChild(header)

// Crear y añadir el contenedor de resultados y mensajes
const resultsDiv = document.createElement('div')
resultsDiv.id = 'results'
const main = document.createElement('main')

const messageDiv = document.createElement('div')
messageDiv.id = 'message'
messageDiv.style.display = 'none'
main.appendChild(messageDiv)

main.appendChild(resultsDiv)
divapp.appendChild(main)
console.log('resultsDiv appended')

// Variables de búsqueda y paginación
let keyword = 'cats' // Búsqueda predeterminada
let page = 1
const accessKey = 'lQCqXdI40O1n6LjRoLvDIQp-eevTJ8TSK2ssSCHwTcU'

// Función para buscar imágenes
async function buscarImagenes(query, page) {
  const searchInput = document.getElementById('searchInput')
  keyword = query || (searchInput ? searchInput.value : keyword)

  // Mostrar mensaje si el input está vacío
  if (!keyword.trim()) {
    showMessage('Please enter a search term.')
    return
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    // Mostrar mensaje si no hay resultados
    if (data.results.length === 0) {
      showMessage('No results found.')
    } else {
      hideMessage()
      displayImagesFromCards(data.results, page)
    }
  } catch (error) {
    console.error('Error fetching images:', error)
    showMessage('Error fetching images. Please try again later.')
  }
}

// Función para mostrar mensajes
function showMessage(message) {
  const resultsBusqueda = document.querySelector('#results')
  resultsBusqueda.innerHTML = '' // Limpiar resultados anteriores
  messageDiv.textContent = message
  messageDiv.style.display = 'block'
}

// Función para ocultar mensajes
function hideMessage() {
  messageDiv.style.display = 'none'
}

// Manejar el evento de envío del formulario de búsqueda
const formBusqueda = document.querySelector('#searchForm')
formBusqueda.addEventListener('submit', (e) => {
  e.preventDefault()
  page = 1
  const query = searchInput.value
  buscarImagenes(query, page)
})

// Realizar una búsqueda predeterminada al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  buscarImagenes(keyword, page)
})

// Cargar más imágenes al hacer scroll hacia abajo
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    page++
    buscarImagenes(keyword, page)
  }
})
