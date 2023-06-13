const orderApi = require('express').Router();
const { SUCCESS_CODE, ERROR_CODE } = require('~/constants/status-code');
const logger = require('~/configs/logger');
const { countPageEachFile } = require('~/utils/utils');
const { db, postgresConnect, Op } = require('~/configs/database');
const { ORDER_STATUS } = require('~/utils/constant');
const Order = require('~/models/Order');
const UploadFile = require('~/models/UploadFile');
const OrderProduct = require('~/models/OrderProduct');

db.sync()
  .then(() => {
    // Start the server or execute other operations
    // after the synchronization is complete
  })
  .catch((error) => {
    console.error('Database synchronization error:', error);
  });

// -----------------------------
orderApi.post('/create', async (req, res) => {
  try {
    const { products, tel = '', email = '', name = '', address = '', options = '' } = req.body;

    const order = await Order.create({
      status: ORDER_STATUS.CONFIRMED.id,
      tel,
      email,
      name,
      address
    });

    let totalAllCost = 0;

    products.forEach(async (product) => {
      const { _id, options, listFiles = [], listFilesName = [], amount, details, price } = product;
      console.log('____-amount, details, price: ', amount, details, price);
      const listFileNameErr = [];
      console.log('_________price * amount', price * amount);

      totalAllCost += price * amount;
      const orderProduct = await OrderProduct.create({
        _id,
        options,
        amount,
        details,
        totalCost: price * amount,
        OrderId: order.id
      });

      // Create UploadFile records and associate them with the Order
      const uploadFilePromises = listFiles.map(async (file, idx) => {
        const rs = await countPageEachFile(file, listFilesName[idx]);
        if (typeof rs === 'string') {
          listFileNameErr.push(rs);
          return null;
        }

        // Create UploadFile record associated with the Order
        const uploadFile = await UploadFile.create({
          name: listFilesName[idx],
          base64: file,
          totalPage: rs
        });

        // Associate the UploadFile with the Order
        await orderProduct.addFile(uploadFile);

        return uploadFile;
      });

      await Promise.all(uploadFilePromises);
    });

    order.totalCost = totalAllCost;
    await order.save();

    return res.status(SUCCESS_CODE.OK).json({ msg: 'Success', data: order.displayId });
  } catch (error) {
    console.log('_____error', error);
    return res.status(ERROR_CODE.BAD_REQUEST).json({ msg: 'Tạo đơn hàng thất bại' });
  }
});

const getOrders = async (req, res) => {
  try {
    let { id, page = '1', pageSize = '100', sort = '-createdAt', search, searchBy, displayId, email, tel } = req.query;

    if (id) {
      const x = await Order.findByPk(id, {
        include: [
          {
            model: OrderProduct,
            as: 'products',
            include: {
              model: UploadFile,
              as: 'files'
            }
          }
        ]
      });
      return res.status(SUCCESS_CODE.OK).json({ orders: { docs: [x], total: 1 } });
    }

    if (displayId) {
      const originRecord = await Order.findOne({ where: { displayId } });

      if (!originRecord) return res.status(SUCCESS_CODE.OK).json({ orders: { docs: [], total: 0 } });
      email = originRecord.email;
      tel = originRecord.tel;
    }
    let conditions = {};
    let tempConds = [];
    if (email) tempConds.push({ email });
    if (tel) tempConds.push({ tel });
    if (tempConds.length) conditions = { [Op.or]: tempConds };

    let sortOrder = [];

    if (sort) {
      const sortFields = sort.split(' ');
      sortFields.forEach((field) => {
        const sortOrderDirection = field.startsWith('-') ? 'DESC' : 'ASC';
        const sortField = field.replace(/^-/, '');
        sortOrder.push([sortField, sortOrderDirection]);
      });
    }

    // Prepare the search conditions
    let searchConditions = {};

    if (search && searchBy) {
      const searchFields = searchBy.split(',');
      searchConditions = {
        [Op.or]: searchFields.map((field) => ({
          [field]: {
            [Op.iLike]: `%${search}%`
          }
        }))
      };
    }

    // Combine the search conditions with the existing conditions
    const combinedConditions = { ...conditions, ...searchConditions };

    Object.keys(combinedConditions).forEach(key => {
      if (combinedConditions[key] === undefined) {
        delete combinedConditions[key];
      }
    });

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const count = await Order.count({
      where: combinedConditions
    });

    const orders = await Order.findAll({
      where: combinedConditions,
      include: [
        {
          model: OrderProduct,
          as: 'products',
          include: {
            model: UploadFile,
            as: 'files'
          }
        }
      ],
      order: sortOrder,
      limit: parseInt(pageSize),
      offset
    });

    return res.status(SUCCESS_CODE.OK).json({ orders: { docs: orders, total: count } });
  } catch (error) {
    logger.error('Failed to fetch orders:', error);
    return res.status(ERROR_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Lỗi khi lấy danh sách đơn hàng' });
  }
};

orderApi.get('', getOrders);

module.exports = orderApi;
