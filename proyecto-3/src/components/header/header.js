import './header.css'
export const headerCreate = () => {
  const header = document.createElement('header')
  header.classList.add('flex-container')

  // logo
  const logoDiv = document.createElement('div')
  const logo = document.createElement('img')
  logo.src = './assets/pinterest-logo.png'
  logoDiv.appendChild(logo)
  logo.className = 'logo'
  logoDiv.id = 'logo-div'

  // home
  const homeText = document.createElement('span')
  homeText.textContent = 'Home'
  logoDiv.appendChild(homeText)
  const todayText = document.createElement('span')
  todayText.textContent = 'Create'
  logoDiv.appendChild(todayText)
  header.appendChild(logoDiv)

  // search
  const searchForm = document.createElement('form')
  searchForm.id = 'searchForm'
  searchForm.className = 'Form-container'

  const searchButton = document.createElement('button')
  searchButton.id = 'searchButton'

  const searchButtonIcon = document.createElement('img')
  searchButtonIcon.src = './assets/search.png'
  searchButtonIcon.alt = 'Buscar'
  searchButton.appendChild(searchButtonIcon)
  searchForm.appendChild(searchButton)

  const searchInput = document.createElement('input')
  searchInput.placeholder = 'Search'
  searchInput.id = 'searchInput'
  searchForm.appendChild(searchInput)

  header.appendChild(searchForm)

  // icons
  const iconsDiv = document.createElement('div')
  const notificationIcon = document.createElement('img')
  notificationIcon.src = './assets/bell.png'
  notificationIcon.className = 'icon'
  notificationIcon.className = 'logo'
  iconsDiv.appendChild(notificationIcon)

  const messagesIcon = document.createElement('img')
  messagesIcon.src = './assets/chat.png'
  messagesIcon.className = 'icon'
  messagesIcon.className = 'logo'
  iconsDiv.appendChild(messagesIcon)

  const profileIcon = document.createElement('img')
  profileIcon.src = './assets/profile-icon.png'
  profileIcon.className = 'icon'
  profileIcon.className = 'logo'
  iconsDiv.appendChild(profileIcon)
  header.appendChild(iconsDiv)

  return header
}
export const addSearchEventListener = (searchHandler) => {
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton')
    searchButton.addEventListener('click', () => {
      const query = document.getElementById('searchInput').value
      searchHandler(query)
    })
  })
}
