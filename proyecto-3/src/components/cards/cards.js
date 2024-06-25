import './cards.css'

export const displayImages = (results, page) => {
  const resultsBusqueda = document.querySelector('#results')
  if (page === 1) {
    resultsBusqueda.innerHTML = ''
  }
  results.forEach((result) => {
    const card = document.createElement('div')
    card.className = 'card'

    const image = document.createElement('img')
    image.src = result.urls.small
    image.alt = result.alt_description || 'Image'

    const imageLink = document.createElement('a')
    imageLink.href = result.links.html
    imageLink.target = '_blank'
    imageLink.appendChild(image)

    const author = document.createElement('p')
    author.textContent = `Photo by ${result.user.name}`

    card.appendChild(imageLink)
    card.appendChild(author)
    resultsBusqueda.appendChild(card)
  })
}
