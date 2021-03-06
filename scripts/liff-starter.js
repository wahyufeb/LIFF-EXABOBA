// define variable
const loader = document.querySelector('#loader');
const homeComponent = document.querySelector('#home');
const cartComponent = document.querySelector('#cart');
const totalPrice = document.querySelector('#total-price');
const totalItems = document.querySelector('#total-items');

const cartHeader = document.querySelector('#cart-header');
const cartItems = document.querySelector('#cart-items');
const cartFooter = document.querySelector('#cart-footer');

const btnHome = document.querySelector('#btn-home');
const btnCart = document.querySelector('#btn-cart');

const openWindowBtn = document.querySelector('#btn-openWindow');
const logoutBtn = document.querySelector('#btn-logout');

const btnOrderNow = document.querySelector('#order-now');

// variable for user data
const userData = {
	name: '',
	picture: '',
};

// set default route
let route = localStorage.getItem('ROUTE') || 'home';
localStorage.setItem('ROUTE', route);

window.onload = () => {
	routeMode();
	const liffId = '1655387498-BJl6w9xY';
	init(liffId);
};

/**
 * ROUTE SECTION
 * Handle render component by route name
 * Check if route is home call homponentActive and then if route not home call cartComponentActive
 */
const routeMode = () => {
	if (route === 'home') {
		homeComponentActive();
	} else {
		cartComponentActive();
		loadCartData();
	}
};

/**
 * INITIALIZE LIFF SECTION
 * Init LIFF using liff.init()
 * @param {string} liffId The liff ID from Line Developer Console
 */
const init = async (liffId) => {
	try {
		const initialize = await liff.init({
			liffId,
		});
		await initializeApp();
	} catch (error) {
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: 'Error',
			text: error,
			showConfirmButton: false,
			timer: 1500,
		});
	}
};

/**
 * AUTHENTICATION SECTION
 * Define variable for login section, login button and logout button
 * login to LINE account using liff.login()
 * logout from application using liff.logout()
 */
const loginSection = document.querySelector('#login-section');
const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', () => {
	return liff.login();
});

logoutBtn.addEventListener('click', () => {
	if (liff.isLoggedIn()) {
		liff.logout();
		loginSection.classList.remove('hidden');
		wrapper.classList.add('hidden');
		if(localStorage.getItem('CART')) localStorage.removeItem('CART')
	}
});

/**
 * OPEN WINDOW SECTION
 * Open the LIFF application in external browser using liff.openWindow()
 */
openWindowBtn.addEventListener('click', () => {
	return liff.openWindow({
		url: 'https://jajaninkuy.herokuapp.com/',
		external: true,
	});
});

/**
 * INITIALIZE APPLICATION
 * Handle if app opened in external browser show logout button, using liff.isInClient()
 * Handle if app opened in Line Application show open window button, using liff.isInClient()
 * Handle if user logged using liff.isLoggedIn() and then call profileData() & loadListMenu()
 */
const wrapper = document.querySelector('#wrapper');

const initializeApp = () => {
	if (liff.isInClient()) {
		logoutBtn.classList.add('hidden');
		openWindowBtn.classList.remove('hidden');
	} else {
		openWindowBtn.classList.add('hidden');
		logoutBtn.classList.remove('hidden');

		// set default style order button
		btnOrderNow.classList.remove('bg-green-300');
		btnOrderNow.classList.remove('px-4');
		btnOrderNow.classList.add('bg-red-300');
		btnOrderNow.classList.add('px-2');
		btnOrderNow.setAttribute('disabled', true);
		btnOrderNow.textContent = 'Tidak dapat memesan pada external browser';
	}

	if (liff.isLoggedIn()) {
		loginSection.classList.add('hidden');
		wrapper.classList.remove('hidden');

		// load profile and menu
		profileData();
		loadListMenu();

		// disable loader
		loader.classList.add('hidden');
	} else {
		loginSection.classList.add('block');
		wrapper.classList.add('hidden');

		// disable loader
		loader.classList.add('hidden');
	}
};

/**
 * PROFILE SECTION
 * Define profile variables and element
 * Load profile data using liff.getProfile()
 */
const profileName = document.querySelector('#profile-name');
const profileImage = document.querySelector('#profile-image');

const picture = document.createElement('img');

const profileData = async () => {
	try {
		const profile = await liff.getProfile();
		const name = await profile.displayName;

		// set default profile image to img element
		picture.setAttribute('src', profile.pictureUrl);
		picture.setAttribute('alt', 'Photo Profile');
		picture.setAttribute('width', '40px');
		picture.setAttribute('height', '40px');
		picture.classList.add('rounded-full');

		profileName.textContent = name;
		profileName.style.fontWeight = 'bold';

		profileImage.append(picture);

		// set user data variable
		userData.name = name;
		userData.picture = profile.pictureUrl;
	} catch (error) {
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: 'Error',
			text: error,
			showConfirmButton: false,
			timer: 1500,
		});
	}
};

/**
 * LIST MENU SECTION
 * Define list menu variable
 * Load list menu, create and set element list menu to homeComponent
 */
const listMenu = [
	{
		id: 1,
		name: 'Strawberry Bubble Tea',
		price: 60000,
		image_url:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fee%2Ffd%2Fd8%2Feefdd8f39672b0d86f6f19dc53bbed1a--strawberry-tea-milk-tea.jpg&f=1&nofb=1',
	},
	{
		id: 2,
		name: 'Thai Iced Milk Tea',
		price: 50000,
		image_url:
			'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0234%2F6273%2Fproducts%2Fthai_tea_buddha_bubbles_boba_a_large.jpg%3Fv%3D1429819336&f=1&nofb=1',
	},
	{
		id: 3,
		name: 'Honeydew Bubble Tea',
		price: 35000,
		image_url:
			'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1161%2F4842%2Fproducts%2Fhoneydew_bubble_tea_2_grande.jpg%3Fv%3D1479238222&f=1&nofb=1',
	},
	{
		id: 4,
		name: 'Mango Bubble Tea',
		price: 30000,
		image_url:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe8%2Fa0%2F6d%2Fe8a06d1411fd7971493a1180d54ffdcf.jpg&f=1&nofb=1',
	},
];

const loadListMenu = () => {
	let listData = '';

	listMenu.map((menu) => {
		listData += `
    <div class="flex justify-between items-center shadow bg-white rounded-lg mb-4 px-4 py-2">
      <div class="flex justify-center items-center space-x-4">
        <img class="w-16 h-16 object-cover rounded-lg" src="${
					menu.image_url
				}" alt="${menu.name}">
        <div class="my-2">
          <h4 class="text-lg">${menu.name}</h4>
          <h4 class="text-sm">Rp.${toRupiah(menu.price)}</h4>
        </div>
      </div>
      <div >
        <button class="w-8 h-8 text-red-500 bg-red-200 m-2 flex items-center justify-center rounded-lg" onClick="addToCart(${
					menu.id
				})">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    </div>
    `;
	});

	homeComponent.innerHTML = listData;
};

/**
 * CART SECTION
 * Define cart variable
 * Cart item consists of id, name, price, image_url, qty and subtotal
 */
let cart = [];


/**
 * Add to cart and set localStorage to save cart data
 * Check if item is exists in the cart then update qty and subtotal
 * Call loadCartData() to load updated cart data
 * Show sweetalert 'Successfully added to cart'
 */
const addToCart = (id) => {
	let cartStorage = localStorage.getItem('CART') || false;

	const itemId = listMenu.find((item) => item.id === id);

	if (!cartStorage) {
		itemId.qty = 1;
		itemId.subtotal = itemId.price * itemId.qty;

		cart.push(itemId);
		localStorage.setItem('CART', [JSON.stringify(cart)]);
	} else {
		const cartData = JSON.parse(cartStorage);
		const checkItemExist = cartData.find((item) => item.id === id);

		if (checkItemExist) {
			const indexItemId = cartData.findIndex((item) => item.id === id);

			const itemId = cartData[indexItemId];
			itemId.qty = itemId.qty + 1;
			itemId.subtotal = itemId.price * itemId.qty;

			cart = cartData;
			localStorage.setItem('CART', [JSON.stringify(cart)]);
		} else {
			itemId.qty = 1;
			itemId.subtotal = itemId.price * itemId.qty;

			cart.push(itemId);
			localStorage.setItem('CART', [JSON.stringify(cart)]);
		}
	}

	loadCartData();

	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Yeay!',
		text: 'Berhasil menambahkan ke keranjang',
		showConfirmButton: false,
		timer: 1000,
	});
};

/**
 * Add qty item in the cart and set to localStorange
 * Call loadCartData() to load updated cart data
 */
const addQty = (id) => {
	const indexItemId = cart.findIndex((item) => item.id === id);
	const itemId = cart.find((item) => item.id === id);
	itemId.qty += 1;
	itemId.subtotal = itemId.qty * itemId.price;

	cart[indexItemId] = itemId;

	localStorage.setItem('CART', [JSON.stringify(cart)]);
	loadCartData();
};

/**
 * reduce qty item in the cart and set to localStorange
 * Call loadCartData() to load updated cart data
 */
const minQty = (id) => {
	const indexItemId = cart.findIndex((item) => item.id === id);
	const itemId = cart.find((item) => item.id === id);

	if (itemId.qty === 1) {
		const newCart = cart.filter((item) => item.id !== id);
		cart = newCart;
	} else {
		itemId.qty -= 1;
		itemId.subtotal = itemId.qty * itemId.price;
		cart[indexItemId] = itemId;
	}

	localStorage.setItem('CART', [JSON.stringify(cart)]);
	loadCartData();
};

/**
 * Load cart data from localStorage
 * Set cart header element, cart item element, and cart footer element
 * Call loadTotalItems() to load updated total items and total price
 */
const loadCartData = () => {
	let cartData = localStorage.getItem('CART') || false;
	let data = '';
	if (!cartData) {
		data = [];
	} else {
		data = JSON.parse(cartData);
		cart = data;
	}

	let headerData = '';
	let itemsData = '';

	if (data.length !== 0) {
		headerData += `
      <div class="mb-4">
        <div class="text-xl font-semibold text-purple-400 mb-2 flex space-x-2">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd">
            </path>
          </svg>
          <h2>Keranjang kamu</h2>
        </div>
        <hr>
      </div>
    `;

		data.map((item, i) => {
			itemsData += `
      <div class="flex justify-between items-end mb-6 shadow px-4 py-2 rounded-lg">
        <div class="flex space-x-6">
          <div class="flex flex-col items-start space-y-2">
            <div>
              <h4 class="text-lg">${item.name}</h4>
              <p class="text-sm text-gray-600">Rp.${toRupiah(item.price)}</p>
            </div>
            <div class="flex justify-center text-center space-x-4 items-center">
              <button class="p-1 bg-red-200 text-red-500 rounded-full" onClick="minQty(${
								item.id
							})">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd">
                  </path>
                </svg>
              </button>
              <h4 class="font-semibold text-md text-purple-500">${item.qty}</h4>
              <button class="p-1 bg-green-200 text-green-500 rounded-full" onClick="addQty(${
								item.id
							})">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="text-right font-semibold text-xl text-purple-700">Rp.${toRupiah(
					item.subtotal,
				)}</div>
      </div>
      `;
		});

		cartFooter.classList.remove('hidden');
	} else {
		headerData += `
      <h4 class="font-light text-lg text-purple-400 text-center opacity-75">Tidak ada produk di keranjang</h4>
    `;

		cartFooter.classList.add('hidden');
	}

	cartHeader.innerHTML = headerData;
	cartItems.innerHTML = itemsData;

	loadTotalItems();
};

/**
 * Load total items and total price
 */
const loadTotalItems = () => {
	let cartData = localStorage.getItem('CART') || false;
	let data = '';
	if (!cartData) {
		data = [];
		totalItems.textContent = 0;
	} else {
		data = JSON.parse(cartData);

		let itemTotal = data.reduce(
			(prevData, nextData) => prevData + nextData.qty,
			0,
		);
		let totalPriceData = data.reduce(
			(prevData, nextData) => prevData + nextData.subtotal,
			0,
		);

		totalItems.textContent = itemTotal;
		totalPrice.textContent = `Rp.${toRupiah(totalPriceData)}`;
	}
};

/**
 * ORDER SECTION
 * Order and send messsage when order button clicked, send message using liff.sendMessages()
 * Then content of message is about ordered item, qty, subtotal and total must be pay
 * Set cart and locaStorage to empty and call loadCartData() to load updated cart data
 * Show sweetalert 'Order Successfully'
 */
btnOrderNow.addEventListener('click', async () => {
	try {
		let itemData = '';
		cart.forEach((item, index) => {
			itemData += `${index + 1}. ${item.name} \n  qty : ${item.qty}    subtotal: Rp.${toRupiah(item.subtotal)} \n\n`;
		});

		let totals = cart.reduce(
			(prevData, nextData) => prevData + nextData.subtotal,
			0,
		);

		const sendMessage = await liff.sendMessages([
			{
				type: 'text',
				text: `Hai ${userData.name}, \nTerimakasih telah memesan minuman di EXA BOBA\n \nBerikut rincian pesanannya : \n\n${itemData}Total : Rp.${toRupiah(totals)} \n\nPesanan akan segera diproses dan mohon untuk ditunggu ya😊`,
			},
		]);

		cart = [];
		localStorage.removeItem('CART');

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Yeay!',
			text: 'Berhasil melakukan pemesanan',
			showConfirmButton: false,
			timer: 1000,
		});

		loadCartData();
	} catch (error) {
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: 'Error',
			text: error,
			showConfirmButton: false,
			timer: 1500,
		});
	}
});

// handle button for switching route to home
btnHome.addEventListener('click', () => {
	homeComponentActive();
});

// handle button for switching route to cart
btnCart.addEventListener('click', () => {
	cartComponentActive();
});

// set default class if homeComponent active & call loadCartData()
const homeComponentActive = () => {
	route = 'home';
	localStorage.setItem('ROUTE', route);

	// class home section
	homeComponent.classList.remove('hidden');
	btnHome.classList.add('text-red-500');
	btnHome.classList.add('rounded-full');
	btnHome.classList.add('bg-red-200');

	totalItems.classList.add('bg-red-200');
	totalItems.classList.add('text-red-500');

	// class cart section
	cartComponent.classList.add('hidden');
	btnCart.className = '';
	btnCart.classList.add('text-white');
	btnCart.classList.add('p-2');
	btnCart.classList.add('relative');

	loadCartData();
};

// set default class if cartComponent active & call loadCartData()
const cartComponentActive = () => {
	route = 'cart';
	localStorage.setItem('ROUTE', route);

	// class home section
	homeComponent.classList.add('hidden');
	btnHome.className = '';
	btnHome.classList.add('text-white');
	btnHome.classList.add('p-2');

	totalItems.classList.remove('hidden');
	totalItems.classList.remove('bg-red-200');
	totalItems.classList.remove('text-red-500');

	// class cart section
	cartComponent.classList.remove('hidden');
	btnCart.classList.add('text-white');
	btnCart.classList.add('text-red-500');
	btnCart.classList.add('rounded-full');
	btnCart.classList.add('bg-red-200');
	btnCart.classList.add('relative');

	loadCartData();
};

// convert to rupiah format
const toRupiah = (val) => {
	return val.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.');
};
