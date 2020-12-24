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
    wrapper.classList.remove('hidden')
    loginSection.classList.add('hidden')
    profileData()
  }else{
    console.error("Not Logged")
  }
}

// LOGIN SECTION
const loginBtn = document.querySelector('#login')

loginBtn.addEventListener('click', () => {
  return liff.login()
})



// PROFILE SECTION
const profileName = document.querySelector('#profile-name');

const profileData = async () => {
  const profile = await liff.getProfile
  const name = await profile.displayName
  console.log(profile)
  console.log(name)
  profileName.textContent = name
}