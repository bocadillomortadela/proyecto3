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
    author.textContent = `${result.user.name}`

    const authorProfileImage = document.createElement('img')
    authorProfileImage.src = result.user.profile_image.small
    authorProfileImage.alt = result.user.name
    authorProfileImage.className = 'author-profile-image'

    const authorDiv = document.createElement('div')
    authorDiv.className = 'authorDiv'
    authorDiv.appendChild(authorProfileImage)
    authorDiv.appendChild(author)

    card.appendChild(imageLink)
    card.appendChild(authorDiv)
    resultsBusqueda.appendChild(card)
  })
}
