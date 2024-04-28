const { cartRepositories } = require("../repositories");

async function getCarts() {
  const carts = await cartRepositories.getCarts();

  if (carts.length === 0) {
    throw new Error("Not Found");
  }

  return carts;
}

async function getCartByUserId(customer_id) {
  let cart = await cartRepositories.getCartByUserId(customer_id);

  if (!cart) {
    cart = await createCart(customer_id);
  }

  const grandPrice = cart.CartDetails.reduce((accumulator, item) => {
    return accumulator + item.total_price;
  }, 0);

  const totalProduct = cart.CartDetails.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  return {
    cart: {
      cart_id: cart.id,
      total_items: cart.CartDetails.length,
      total_product: totalProduct,
      grand_price: grandPrice,
    },
    cart_items: cart.CartDetails,
    user_customer: {
      customer_id: cart.Customer.id,
      user_id: cart.Customer.user_id,
      name: cart.Customer.fullname,
      phone: cart.Customer.telephone,
      address: cart.Customer.address,
      city: cart.Customer.city,
      postal_code: cart.Customer.postal_code,
    },
  };
}

async function createCart(customer_id) {
  const cart = await cartRepositories.createCart(customer_id);

  return cart;
}

module.exports = {
  getCarts,
  getCartByUserId,
  createCart,
};
