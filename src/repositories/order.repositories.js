const { Op } = require("sequelize");
const {
  orderModel,
  orderItemModel,
  productModel,
  customerModel,
  shippingModel,
  userModel,
} = require("../models");

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
  return await orderModel.create({
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

async function getOrders({ page, keyword }) {
  const offset = (page - 1) * 10;

  let whereClause = [
    {
      [Op.or]: [
        {
          id: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          status: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          payment_method: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  ];

  return await orderModel.findAndCountAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: whereClause,
    offset,
    limit: 10,
    order: [["payment_date", "DESC"]],
    include: [
      {
        model: customerModel,
        as: "Customer",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
      {
        model: shippingModel,
        as: "Shipping",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: orderItemModel,
        as: "OrderItems",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: productModel,
            as: "Product",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
    distinct: true,
  });
}

async function getOrderByDate({ keyword, startDate, endDate }) {
  let whereClause = [
    {
      [Op.or]: [
        {
          status: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          payment_method: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          payment_date: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          bank: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  ];

  if (startDate && endDate) {
    const endDatePlusOneDay = new Date(endDate);
    endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1);

    whereClause.push({
      payment_date: {
        [Op.between]: [startDate, endDatePlusOneDay],
      },
    });
  }

  return await orderModel.findAndCountAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: whereClause,
    order: [["payment_date", "DESC"]],
    include: [
      {
        model: customerModel,
        as: "Customer",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
      {
        model: shippingModel,
        as: "Shipping",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: orderItemModel,
        as: "OrderItems",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: productModel,
            as: "Product",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
    distinct: true,
  });
}

async function getOrderByStatus({ status }) {
  return await orderModel.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: customerModel,
        as: "Customer",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
      {
        model: shippingModel,
        as: "Shipping",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: orderItemModel,
        as: "OrderItems",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: productModel,
            as: "Product",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
    where: {
      status,
    },
  });
}

async function getOrderStatusById({ transaction_id }) {
  return await orderModel.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      id: transaction_id,
    },
    include: [
      {
        model: customerModel,
        as: "Customer",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: userModel,
            as: "User",
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
        ],
      },
      {
        model: shippingModel,
        as: "Shipping",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: orderItemModel,
        as: "OrderItems",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: productModel,
            as: "Product",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  });
}

async function getOrderByCustomerId(customer_id, { page, keyword }) {
  const offset = (page - 1) * 10;
  let whereClause = [
    {
      customer_id,
      [Op.or]: [
        {
          id: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          status: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          payment_method: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          "$Shipping.status$": {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          "$Shipping.type$": {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          "$Shipping.province$": {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          "$Shipping.city$": {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  ];

  return await orderModel.findAndCountAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: whereClause,
    offset,
    limit: 10,
    order: [["payment_date", "DESC"]],
    include: [
      {
        model: shippingModel,
        as: "Shipping",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });
}

async function updateOrderStatus(id, shipping_id, newStatus, shipping_status) {
  const updateOrder = await orderModel.update(
    {
      status: newStatus,
    },
    {
      where: {
        id,
      },
    }
  );

  const updateShipping = await shippingModel.update(
    {
      status: shipping_status,
    },
    {
      where: {
        id: shipping_id,
      },
    }
  );

  return { updateOrder, updateShipping };
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
