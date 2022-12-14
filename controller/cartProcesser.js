const cartList = [];

const cartView = document.querySelector("#cartView");

const cartListCopy = JSON.parse(localStorage.getItem("cartList")) || [];

const renderCartUI = (cartList) => {
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
        <div class="productSelected__id">${cartProduct.product.id}</div>
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
        <div class="productSelected__delete" style="cursor: pointer" onclick="removeCart()">&times;</div>
      </div>
      <br />
      <button id="decrement" onclick="changeCounter(-1, ${
        cartProduct.product.id
      })">-</button> 
      <input class="inputChange" id="demoInput${
        cartProduct.product.id
      }" type="number" value=${cartProduct.quantity} min="1" max="100" />
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
      <button>TỚI TRANG THANH TOÁN</button>`;
  }
};

renderCartUI(cartListCopy);

const changeCounter = (dir, id) => {
  const inputChange = document.getElementById(`demoInput${id}`);
  switch (dir) {
    case -1:
      if (+inputChange.value <= 1) return true;
      inputChange.value--;
      saveCart(cartListCopy);
      updateCart(cartListCopy);
      break;
    case 1:
      inputChange.value++;
      saveCart(cartListCopy);
      updateCart(cartListCopy);
      break;

    default:
      saveCart(cartListCopy);
      updateCart(cartListCopy);
      break;
  }
};

const addToCart = (id) => {
  saveCart(cartListCopy);
  const productSelected = productList.find((product) => (product.id = id));
  cartList.push(productSelected);
};

const saveCart = (cartList) => {
  let cartItem = {
    // product: { id:  },
    quantity: 1,
  };
  localStorage.setItem("cartList", JSON.stringify(cartItem));
  renderCartUI(cartListCopy);
};

const updateCart = (cartListCopy) => {
  cartView.innerHTML = "";
  saveCart(cartListCopy);
  renderCartUI(cartListCopy);
};
