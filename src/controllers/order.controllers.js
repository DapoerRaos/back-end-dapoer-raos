const { orderServices, customerServices } = require("../services");
const midtransClient = require("midtrans-client");
const logger = require("../utils/logger");
const { MIDTRANS_SERVER_KEY } = require("../config");
const { URL } = require("../constants");

async function processOrder(req, res) {
  try {
    const { order_id, fullname, telephone, shipping_cost, products } = req.body;

    const itemDetails = products.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    }));

    const totalItemPrice = products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );

    const gross_amount = totalItemPrice + shipping_cost;

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount,
      },
      credit_card: {
        secure: true,
      },
      // item_details: itemDetails,
      customer_details: {
        first_name: fullname,
        phone: telephone,
      },
      enabled_payments: ["bca_va", "bni_va", "bri_va", "cimb_va", "other_va"],
      callbacks: {
        finish: `${URL.FRONT_END_URL}/order-status?order_id=${order_id}`,
        error: `${URL.FRONT_END_URL}/order-status?order_id=${order_id}`,
        pending: `${URL.FRONT_END_URL}/order-status?order_id=${order_id}`,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    res.status(201).json({
      message: "Create transaction success",
      token: transaction.token,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function createOrder(req, res) {
  try {
    const {
      id,
      customer_id,
      total_price,
      status,
      shipping_status,
      shipping_type,
      shipping_cost,
      payment_method,
      va_number,
      bank,
      payment_date,
    } = req.body;

    const order = await orderServices.createOrder({
      id,
      customer_id: parseInt(customer_id),
      total_price: parseFloat(total_price),
      status,
      shipping_status,
      shipping_type,
      shipping_cost,
      payment_method,
      va_number,
      bank,
      payment_date,
    });

    res.status(201).json({
      status: "Success",
      message: "Order Berhasil Ditambahkan",
      data: order,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function getOrders(req, res) {
  try {
    const result = await orderServices.getOrders(req.query);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function getOrderByStatus(req, res) {
  try {
    const result = await orderServices.getOrderByStatus(req.query);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function getOrderStatusById(req, res) {
  try {
    const result = await orderServices.getOrderStatusById(req.query);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function getTransactionStatus(req, res) {
  try {
    const { id } = req.params;

    const secret = MIDTRANS_SERVER_KEY;
    const encodedSecret = Buffer.from(secret).toString("base64");

    const url = `https://api.sandbox.midtrans.com/v2/${id}/status`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedSecret}`,
      },
    };

    let responseData;

    await fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        responseData = json;
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    res.status(200).json({
      status: "Success",
      data: responseData,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function getOrderByCustomerId(req, res) {
  try {
    const user_id = req.userData.id;
    const customer = await customerServices.getCustomerById(user_id);

    const customer_id = customer.id;
    const response = await orderServices.getOrderByCustomerId(
      customer_id,
      req.query
    );
    res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { newStatus, shipping_status } = req.body;
    const result = await orderServices.updateOrderStatus(
      id,
      newStatus,
      shipping_status
    );
    res.status(200).json({
      status: "Success",
      message: "Status Order Berhasil Diupdate",
      data: result,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

module.exports = {
  processOrder,
  createOrder,
  getOrders,
  getOrderByStatus,
  getOrderStatusById,
  getTransactionStatus,
  getOrderByCustomerId,
  updateOrderStatus,
};
