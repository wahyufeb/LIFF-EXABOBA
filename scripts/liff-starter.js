const loader = document.querySelector('#loader')
const homeComponent = document.querySelector('#home')
const cartComponent = document.querySelector('#cart')

const btnHome = document.querySelector('#btn-home')
const btnCart = document.querySelector('#btn-cart')

let route = localStorage.getItem('ROUTE') || 'home'
localStorage.setItem('ROUTE', route);

window.onload = () => {
  routeMode()
  const liffId = '1655387498-BJl6w9xY'
  init(liffId)
}

// ROUTE COMPONENT
const routeMode = () => {
  if(route === 'home') {
    homeComponentActive()
  }else{
    cartComponentActive()
    loadCartData()
  }
}


// INITIALIZE LIFF
const init = async (liffId) => {
  try {
    const initialize = await liff.init({ liffId })
    await initializeApp()
  } catch (error) {
    console.error(error)
  }
}


// AUTHENTICATION SECTION
const loginSection = document.querySelector('#login-section')
const loginBtn = document.querySelector('#login')

loginBtn.addEventListener('click', () => {
  return liff.login()
})


// INITIALIZE APPLICATION
const wrapper = document.querySelector('#wrapper')
const initializeApp = () => {
  if(liff.isLoggedIn()) {
    // loginSection.classList.add('hidden')
    // wrapper.classList.remove('hidden')

    profileData()
    loadListMenu()
    // Disable loader
    loader.classList.add('hidden')
  }else{
    // loginSection.classList.add('block')
    // wrapper.classList.add('hidden')
    // Disable loader
    loader.classList.add('hidden')
  }
}


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

// LIST MENU SECTION
const listMenu = [
    { id:1, name: 'Strawberry Bubble Tea', price:60000, image_url:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fee%2Ffd%2Fd8%2Feefdd8f39672b0d86f6f19dc53bbed1a--strawberry-tea-milk-tea.jpg&f=1&nofb=1' },
    { id:2, name: 'Thai Iced Milk Tea', price:50000, image_url:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0234%2F6273%2Fproducts%2Fthai_tea_buddha_bubbles_boba_a_large.jpg%3Fv%3D1429819336&f=1&nofb=1' },
    { id:3, name: 'Honeydew Bubble Tea', price:35000, image_url:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1161%2F4842%2Fproducts%2Fhoneydew_bubble_tea_2_grande.jpg%3Fv%3D1479238222&f=1&nofb=1' },
    { id:4, name: 'Mango Bubble Tea', price:30000, image_url:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe8%2Fa0%2F6d%2Fe8a06d1411fd7971493a1180d54ffdcf.jpg&f=1&nofb=1' },
    { id:4, name: 'Mango Bubble Tea', price:30000, image_url:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe8%2Fa0%2F6d%2Fe8a06d1411fd7971493a1180d54ffdcf.jpg&f=1&nofb=1' },
    { id:4, name: 'Mango Bubble Tea', price:30000, image_url:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe8%2Fa0%2F6d%2Fe8a06d1411fd7971493a1180d54ffdcf.jpg&f=1&nofb=1' },
  ]

const loadListMenu = () => {
  let listData = ''

  listMenu.map(menu => {
    listData += `
    <div class="flex justify-between items-center shadow bg-white rounded-lg mb-4 px-4 py-2">
      <div class="flex justify-center items-center space-x-4">
        <img class="w-16 h-16 object-cover" src="${menu.image_url}" alt="${menu.name}">
        <div class="my-2">
          <h4 class="text-lg">${menu.name}</h4>
          <h4 class="text-sm">${menu.price}</h4>
        </div>
      </div>
      <div >
        <button class="w-8 h-8 text-red-500 bg-red-200 m-2 flex items-center justify-center rounded-lg" onClick="addToCart(${menu.id})">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    </div>
    `
  });

  homeComponent.innerHTML = listData
}

// CART SECTION
const cart = []
const addToCart = (id) => {
  //
  let cartStorage = localStorage.getItem('CART') || false

  const itemId = listMenu.find(item => item.id === id)

  if(!cartStorage) {
    itemId.qty = 1
    itemId.subtotal = itemId.price * itemId.qty

    cart.push(itemId)
    localStorage.setItem('CART', [JSON.stringify(cart)])
  }else{
    const cartData = JSON.parse(cartStorage)
    const checkItemExist = cartData.find(item => item.id === id)
    if(checkItemExist) {
      const indexItemId = cartData.findIndex(item => item.id === id);
      const itemId = cartData[indexItemId]
      itemId.qty = itemId.qty + 1
      itemId.subtotal = itemId.price * itemId.qty
      localStorage.setItem('CART', [JSON.stringify(cartData)])
    }else{
      itemId.qty = 1
      itemId.subtotal = itemId.price * itemId.qty

      cart.push(itemId)
      localStorage.setItem('CART', [JSON.stringify(cart)])
    }
  }
}

const loadCartData = () => {
  console.error(cart)
  console.error(JSON.parse(localStorage.getItem('CART')))
}

// HANDLE BUTTON NAVIGATION BAR
btnHome.addEventListener('click', () => {
  homeComponentActive()
})

btnCart.addEventListener('click', () => {
  cartComponentActive()
  loadCartData()
})

const homeComponentActive = () => {
  route = 'home'
  localStorage.setItem('ROUTE', route);

  // home
  homeComponent.classList.remove('hidden')
  btnHome.classList.add('text-red-500')
  btnHome.classList.add('rounded-full')
  btnHome.classList.add('bg-red-200')

  // set default cart button
  cartComponent.classList.add('hidden')
  btnCart.className = ''
  btnCart.classList.add('text-white')
  btnCart.classList.add('p-2')
}

const cartComponentActive = () => {
  route = 'cart'
  localStorage.setItem('ROUTE', route);

  // set default home button
  homeComponent.classList.add('hidden')
  btnHome.className = ''
  btnHome.classList.add('text-white')
  btnHome.classList.add('p-2')

  // cart
  cartComponent.classList.remove('hidden')
  btnCart.classList.add('text-white')
  btnCart.classList.add('text-red-500')
  btnCart.classList.add('rounded-full')
  btnCart.classList.add('bg-red-200')
}