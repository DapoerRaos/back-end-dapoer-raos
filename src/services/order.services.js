const { orderRepositories } = require("../repositories");
const nodemailer = require("nodemailer");
const { APP_MAIL, APP_PASSWORD } = require("../config");

async function createOrder(data) {
  const {
    id,
    customer_id,
    shipping_id,
    total_price,
    status,
    payment_method,
    va_number,
    bank,
    payment_date,
  } = data;

  if (
    !id ||
    !customer_id ||
    !shipping_id ||
    !total_price ||
    !status ||
    !payment_method ||
    !payment_date
  ) {
    throw new Error("There's data missing");
  }

  return await orderRepositories.createOrder({
    id,
    customer_id,
    shipping_id,
    total_price,
    status,
    payment_method,
    va_number,
    bank,
    payment_date,
  });
}

async function getOrders({ page = 1, keyword = "" }) {
  const limit = 10;
  const result = await orderRepositories.getOrders({
    page,
    keyword,
  });

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

async function getOrderByDate({ keyword = "", startDate, endDate }) {
  const result = await orderRepositories.getOrderByDate({
    keyword,
    startDate,
    endDate,
  });

  if (result.length === 0) {
    throw new Error("Order is Empty!");
  }

  return {
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

async function updateOrderStatus(id, shipping_id, newStatus, shipping_status) {
  if (!id) {
    throw new Error("Invalid Id");
  }

  const orderDetail = await orderRepositories.getOrderStatusById({
    transaction_id: id,
  });

  const email =
    orderDetail.dataValues.Customer.dataValues.User.dataValues.email;

  if (shipping_status) {
    const shippingStatusMessage =
      shipping_status === "Menunggu Pembayaran"
        ? "Sedang Menunggu Pembayaran"
        : shipping_status === "Barang di Kemas"
        ? "Barang sedang dikemas"
        : shipping_status === "Barang Siap Diambil"
        ? "Barang siap diambil"
        : shipping_status === "Barang Dikirim"
        ? "Sudah dikirim, sedang dalam perjalanan"
        : shipping_status === "Barang Telah Diambil"
        ? "Barang Sudah diambil"
        : shipping_status === "Barang Telah Diterima"
        ? "Barang sudah sampai tujuan, barang telah diterima"
        : "";

    const htmlMessage = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #2e6c80;">Informasi Pesanan Anda</h2>
    <p>Halo,</p>
    <p>Pesanan dengan ID <strong>${id}</strong> saat ini:</p>
    <p style="font-size: 1.1em; font-weight: bold; color: #feab3b;">${shippingStatusMessage}</p>
    <p>Terima kasih telah berbelanja di Dapoer Raos. Kami akan terus memperbarui status pengiriman Anda.</p>
    <br>
    <p>Salam,</p>
    <p style="font-weight: bold;">Dapoer Raos</p>
  </div>
`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: APP_MAIL,
        pass: APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Dapoer Raos" <no-reply@dapoerraos.com>',
      to: email,
      subject: `Informasi Pesanan dengan ID ${id}`,
      html: htmlMessage,
    });
  }

  return await orderRepositories.updateOrderStatus(
    id,
    shipping_id,
    newStatus,
    shipping_status
  );
}

module.exports = {
  createOrder,
  getOrders,
  getOrderByDate,
  getOrderByStatus,
  getOrderStatusById,
  getOrderByCustomerId,
  updateOrderStatus,
};
