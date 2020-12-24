
const loginBtn = document.querySelector('#login')

loginBtn.addEventListener('click', () => {
  return liff.login()
})

// user logged
const profileName = document.querySelector('#profile-name');

if(liff.isLoggedIn()){
  profileData()
}

const profileData = async () => {
  const profile = await liff.getProfile
  const name = profile.displayName

  profileName.innerHTML = name
}