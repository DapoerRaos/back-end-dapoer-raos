const { Op } = require("sequelize");
const {
  orderModel,
  orderItemModel,
  productModel,
  customerModel,
} = require("../models");

async function createOrder(data) {
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
  } = data;
  return await orderModel.create({
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
  });
}

async function getOrders({ page, keyword }) {
  const offset = (page - 1) * 10;

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
  });
}

async function updateOrderStatus(id, newStatus, shipping_status) {
  return await orderModel.update(
    {
      status: newStatus,
      shipping_status,
    },
    {
      where: {
        id,
      },
    }
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
