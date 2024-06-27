import './style.css'
import { headerCreate } from './src/components/header/header'
import { displayImages as displayImagesFromCards } from './src/components/cards/cards'

const divapp = document.querySelector('#app')
const header = headerCreate()
divapp.appendChild(header)

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

let keyword = 'cats'
let page = 1
const accessKey = 'lQCqXdI40O1n6LjRoLvDIQp-eevTJ8TSK2ssSCHwTcU'

async function buscarImagenes(query, page) {
  const searchInput = document.getElementById('searchInput')
  keyword = query || (searchInput ? searchInput.value : keyword)

  if (!keyword.trim()) {
    showMessage('Please enter a search term.')
    return
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    console.log(data)

    if (data.results.length === 0) {
      // Realizar una nueva búsqueda con la palabra 'gatos'
      const fallbackKeyword = 'gatos'
      const fallbackUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${fallbackKeyword}&client_id=${accessKey}`
      const fallbackResponse = await fetch(fallbackUrl)
      const fallbackData = await fallbackResponse.json()
      if (fallbackData.results.length === 0) {
        showMessage('No results found. Please try another search term.')
      } else {
        showMessage(
          'No results found for your search. Here are some images of cats instead. Please try another search term.'
        )
        displayImagesFromCards(fallbackData.results, page)
      }
    } else {
      hideMessage()
      displayImagesFromCards(data.results, page)
    }
  } catch (error) {
    console.error('Error fetching images:', error)
  }
  searchInput.value = ''
}
// hehe
function showMessage(message) {
  const resultsBusqueda = document.querySelector('#results')
  resultsBusqueda.innerHTML = ''
  messageDiv.textContent = message
  messageDiv.style.display = 'block'
}

function hideMessage() {
  messageDiv.style.display = 'none'
}

const formBusqueda = document.getElementById('searchForm')
formBusqueda.addEventListener('submit', (e) => {
  e.preventDefault()
  page = 1
  const query = searchInput.value
  console.log('Search query:', query)
  buscarImagenes(query, page)
})

document.addEventListener('DOMContentLoaded', () => {
  buscarImagenes(keyword, page)
})
// scroll infinite
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    page++
    buscarImagenes(keyword, page)
  }
})
const logoDiv = document.getElementById('logo-div')
logoDiv.addEventListener('click', () => {
  page = 1
  buscarImagenes(keyword, page)
})
//
