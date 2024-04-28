const { orderRepositories } = require("../repositories");

async function createOrder(data) {
  const {
    id,
    customer_id,
    total_price,
    status,
    shipping_status,
    shipping_type,
    payment_method,
    va_number,
    bank,
    payment_date,
  } = data;

  if (
    !id ||
    !customer_id ||
    !total_price ||
    !status ||
    !shipping_status ||
    !shipping_type ||
    !payment_method ||
    !payment_date
  ) {
    throw new Error("There's data missing");
  }

  return await orderRepositories.createOrder({
    id,
    customer_id,
    total_price,
    status,
    shipping_status,
    shipping_type,
    payment_method,
    va_number,
    bank,
    payment_date,
  });
}

async function getOrders({ page = 1, keyword = "" }) {
  const limit = 10;
  const result = await orderRepositories.getOrders({ page, keyword });

  if (result.length === 0) {
    throw new Error("Order is Empty!");
  }

  const totalPages = Math.ceil(result.count / limit);

  return {
    pagination: {
      page: page,
      perpage: limit,
      total: result.count,
      totalPages: totalPages,
    },
    order_list: result.rows,
  };
}

async function getOrderByStatus({ status }) {
  const result = await orderRepositories.getOrderByStatus({ status });

  if (!result) {
    throw new Error("Order By Status Not Found");
  }

  const income = result.reduce(
    (accumulator, order) => accumulator + order.total_price,
    0
  );

  return {
    income: income,
    result,
  };
}

async function getOrderStatusById({ transaction_id }) {
  const result = await orderRepositories.getOrderStatusById({ transaction_id });

  if (!result) {
    throw new Error("Order By Id Not Found");
  }

  return result;
}

async function getOrderByCustomerId(customer_id, { page = 1, keyword = "" }) {
  const limit = 10;

  if (!customer_id) {
    throw new Error("Invalid Id");
  }

  const result = await orderRepositories.getOrderByCustomerId(customer_id, {
    page,
    keyword,
  });

  const totalPages = Math.ceil(result.count / limit);

  return {
    pagination: {
      page: page,
      perpage: limit,
      total: result.count,
      totalPages: totalPages,
    },
    order_list: result.rows,
  };
}

async function updateOrderStatus(id, newStatus, shipping_status) {
  if (!id) {
    throw new Error("Invalid Id");
  }

  return await orderRepositories.updateOrderStatus(
    id,
    newStatus,
    shipping_status
  );
}

module.exports = {
  createOrder,
  getOrders,
  getOrderByStatus,
  getOrderStatusById,
  getOrderByCustomerId,
  updateOrderStatus,
};
