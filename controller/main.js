const productService = new ProductService();
let productList = [];

const render = (products) => {
  containerListProduct.innerHTML = "";
  products.forEach((product) => {
    const templateProductHTML = `
    <div class="col-12 col-md-6 col-lg-4">
    <div class="card cardPhone">
      <img src="${product.img}" class="card-img-top" alt="..." />
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <h3 class="cardPhone__title">${product.name}</h3>
            <p class="cardPhone__text">${product.desc}</p>
          </div>
          <div>
            <h3 class="cardPhone__title">${product.price}$</h3>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="cardPhone__rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div>
            <button class="btnPhone-shadow" onclick=addToCart('${product.id}')>
              <i class="fa fa-shopping-cart"></i> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    containerListProduct.innerHTML += templateProductHTML;
  });
};

function showListProducts() {
  productService
    .getListProductApi()
    .then((data) => {
      render(data.data);
      productList = data.data;
    })
    .catch((error) => console.log(error));
}

showListProducts();

// filter

filterType.onchange = (e) => {
  let newProducts = [];
  productList.filter((product) => {
    if (product.type.toLowerCase() === e.target.value) {
      newProducts.push(product);
    } else if (e.target.value === "default") {
      newProducts.push(product);
    }
  });
  render(newProducts);
};

// cart

const cartList = [];
const cartListStored = JSON.parse(localStorage.getItem("cartList")) || [];

function renderCart(cartList) {
  cartView.innerHTML = "";
  counterCart.innerHTML = cartList.length;
  if (cartList.length <= 0) {
    cartView.innerHTML = `<p>You have not added any products yet.</p>
      <img
        src="https://janbox.com/images/cart-empty.svg"
        width="200px"
        alt=""
      />`;
  } else {
    let totalPay = 0;
    cartList.forEach((cartProduct, index) => {
      cartView.innerHTML += `
      <div class="cart__product">
      <div class="productSelected">
        <div class="index">${index + 1}</div>
        <div class="productSelected__img">
          <img
            src="${cartProduct.product.img}"
            height="60px"
            alt=""
          />
        </div>
        <div class="productSelected__info">
          <div class="productSelected__name">${cartProduct.product.name}</div>
          <div class="productSelected__price">${
            cartProduct.product.price
          } $</div>
        </div>
        <div class="productSelected__delete" style="cursor: pointer" onclick="removeCart(${
          cartProduct.product.id
        })">&times;</div>
      </div>
      <br />
      <button id="decrement" onclick="changeCounter(-1, ${
        cartProduct.product.id
      })">-</button> 
      <input class="inputChange" type="number" value=${
        cartProduct.quantity
      } min="1" max="100" />
      <button id="increment" onclick="changeCounter(1, ${
        cartProduct.product.id
      })">+</button>
      <br />
      <br />
      <p>Tạm tính: <span class="lastPrice">${
        cartProduct.product.price * cartProduct.quantity
      }</span></p>
    </div>
      `;
      totalPay += cartProduct.product.price * cartProduct.quantity;
    });
    cartView.innerHTML += `<h3 style="color: #fff">TỔNG THANH TOÁN: ${totalPay}</h3>
      <button onclick="toPaymentPage()">TỚI TRANG THANH TOÁN</button>`;
  }
}

renderCart(cartListStored);

function addToCart(id) {
  let productSelected = productList.find((product) => product.id === id);
  let cartItem = {
    product: {
      id: productSelected.id,
      name: productSelected.name,
      price: productSelected.price,
      img: productSelected.img,
    },
    quantity: 1,
  };
  console.log(checkDuplicateProduct(id));
  cartListStored.push(cartItem);
  saveToLocal(cartListStored);
  renderCart(cartListStored);
}

function saveToLocal(products) {
  localStorage.setItem("cartList", JSON.stringify(products));
}

/*
 * chưa xong phần này nha
 **************************
 */
function checkDuplicateProduct(id) {
  let productDuplicate = cartListStored.filter((productInCart) => {
    return productInCart.product.id === String(id);
  });
  // return productDuplicate.quantity++;
  console.log(productDuplicate);
}

/*
 **************************
 */

function removeCart(id) {
  const indexOfProductRemoved = cartListStored.findIndex((cartProduct) => {
    return cartProduct.product.id === String(id);
  });
  cartListStored.splice(indexOfProductRemoved, 1);
  saveToLocal(cartListStored);
  renderCart(cartListStored);
}

const changeCounter = (dir, id) => {
  let productSelected = cartListStored.find(
    (cartProduct) => cartProduct.product.id === String(id)
  );
  switch (dir) {
    case -1:
      if (productSelected.quantity <= 1) return;
      productSelected.quantity--;
      saveToLocal(cartListStored);
      renderCart(cartListStored);
      break;
    case 1:
      productSelected.quantity++;
      saveToLocal(cartListStored);
      renderCart(cartListStored);
      break;
    default:
      saveToLocal(cartListStored);
      renderCart(cartListStored);
      break;
  }
};

function toPaymentPage() {
  cartListStored.length = 0;
  saveToLocal(cartListStored);
  renderCart(cartListStored);
}
