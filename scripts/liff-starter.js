const loader = document.querySelector('#loader')
const homeComponent = document.querySelector('#home')
const cartComponent = document.querySelector('#cart')

const btnHome = document.querySelector('#btn-home')
const btnCart = document.querySelector('#btn-cart')

window.onload = () => {
  routeMode()
  const liffId = '1655387498-BJl6w9xY'
  init(liffId)
}

const routeMode = () => {
  const route = localStorage.getItem('ROUTE') || 'home'
  localStorage.setItem('ROUTE', route);
  if(route === 'home') {
    homeComponent.classList.remove('hidden')
    btnHome.classList.add('text-red-500 p-2 rounded-full bg-red-200')
    btnCart.classList.add('text-white')
  }else{
    cartComponent.classList.remove('hidden')
    btnHome.classList.add('text-white')
    btnCart.classList.add('text-red-500 p-2 rounded-full bg-red-200')
  }
}
const init = async (liffId) => {
  try {
    const initialize = await liff.init({ liffId })
    await initializeApp()
  } catch (error) {
    console.error(error)
  }
}
const wrapper = document.querySelector('#wrapper')
const loginSection = document.querySelector('#login-section')

const initializeApp = () => {
  if(liff.isLoggedIn()) {
    loginSection.classList.add('hidden')
    wrapper.classList.remove('hidden')
    profileData()
    loader.classList.add('hidden')
  }else{
    loginSection.classList.add('block')
    wrapper.classList.add('hidden')
    loader.classList.add('hidden')
  }
}

// LOGIN SECTION
const loginBtn = document.querySelector('#login')

loginBtn.addEventListener('click', () => {
  return liff.login()
})



// PROFILE SECTION
const profileName = document.querySelector('#profile-name');
const profileImage = document.querySelector('#profile-image')

const picture = document.createElement('img')

const profileData = async () => {
  try {
    const profile = await liff.getProfile()
    const name = await profile.displayName

    picture.setAttribute('src', profile.pictureUrl)
    picture.setAttribute('alt', 'Photo Profile')
    picture.setAttribute('width', '40px')
    picture.setAttribute('height', '40px')
    picture.classList.add('rounded-full')

    profileName.textContent = name
    profileName.style.fontWeight = 'bold'

    profileImage.append(picture)
  } catch (error) {
    console.error(error)
  }
}