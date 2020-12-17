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
const container = document.querySelector('.container')

const initializeApp = () => {
  if(liff.isLoggedIn()) {
    container.classList.remove('hidden')
  }else{
    console.error("Not Logged")
  }
}