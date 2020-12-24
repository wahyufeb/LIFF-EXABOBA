const loader = document.querySelector('#loader')

window.onload = () => {
  const liffId = '1655387498-BJl6w9xY'
  init(liffId)
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
    picture.setAttribute('width', '50px')
    picture.setAttribute('height', '50px')

    profileName.textContent = name
    profileImage.append(picture)
  } catch (error) {
    console.error(error)
  }
}