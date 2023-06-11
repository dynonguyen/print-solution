const orderApi = require('express').Router();
const { SUCCESS_CODE, ERROR_CODE } = require('~/constants/status-code');
const logger = require('~/configs/logger');
const { countPageEachFile } = require('~/utils/utils');
const { db, postgresConnect, Op } = require('~/configs/database');
const { ORDER_STATUS } = require('~/utils/constant');
const Order = require('~/models/Order');
const UploadFile = require('~/models/UploadFile');
// -----------------------------
orderApi.post('/create', async (req, res) => {
  try {
    const {
      listFiles = [],
      listFilesName = [],
      tel = '',
      zalo = '',
      name = '',
      address = '',
      details = '',
      selectedCategory: category,
      selectedProduct: product,
      createdBy = ''
    } = req.body;
    console.log('____here: ', req.body);
    console.log('____here 2: ', tel, zalo, name, address, details, category, product);
    const listFileNameErr = [];
    const order = await Order.create({
      status: ORDER_STATUS.INIT,
      tel,
      zalo,
      name,
      address,
      details,
      category,
      product,
      createdBy: req.user.isAdmin ? createdBy : req.user.sub
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
      await order.addFile(uploadFile);

      return uploadFile;
    });

    await Promise.all(uploadFilePromises);
    console.log('____x', order.id,  order.dataValues, order );
    return res.status(SUCCESS_CODE.OK).json({ msg: 'Success', data: {...order.dataValues, listFilesName} });
  } catch (error) {
    return res.status(ERROR_CODE.BAD_REQUEST).json({ msg: 'Tạo đơn hàng thất bại' });
  }
});
orderApi.get('', async (req, res) => {
  try {
    const { page, pageSize, sort, search, searchBy } = req.query;

    const conditions = {};

    if (!req.user.isAdmin) conditions.createdBy = req.user.sub;

    // Prepare the sorting order based on the sort parameter
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

    // Count the number of rows that match the conditions
    const count = await Order.count({
      where: combinedConditions
    });

    // Calculate the offset based on the page and pageSize
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    // Find the orders based on the conditions, pagination, sorting, and search
    const docs = await Order.findAll({
      where: combinedConditions,
      include: [
        {
          model: UploadFile,
          as: 'files'
        }
      ],
      limit: parseInt(pageSize), // Number of records per page
      offset, // Offset based on page number
      order: sortOrder // Specify the sorting order
    });

    return res.status(SUCCESS_CODE.OK).json({ orders: { docs, total: count } });
  } catch (error) {
    logger.error('Failed to fetch orders:', error);
    return res.status(ERROR_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Lỗi khi lấy danh sách đơn hàng' });
  }
});
module.exports = orderApi;
