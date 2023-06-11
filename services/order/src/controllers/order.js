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
      email = '',
      name = '',
      address = '',
      details = '',
      options = '',
      selectedCategory: category,
      selectedProduct: product,
      createdBy = ''
    } = req.body;
    console.log('____ params: ', req.body);
    const listFileNameErr = [];
    const order = await Order.create({
      status: ORDER_STATUS.CONFIRMED.id,
      tel,
      email,
      name,
      address,
      details,
      category,
      product,
      options,
      createdBy: req?.user?.sub ? req.user.sub : createdBy
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
    return res.status(SUCCESS_CODE.OK).json({ msg: 'Success', data: order.displayId  });
  } catch (error) {
    console.log("_____error", error)
    return res.status(ERROR_CODE.BAD_REQUEST).json({ msg: 'Tạo đơn hàng thất bại' });
  }
});

orderApi.get('', async (req, res) => {
  try {
    let { id, page = '1', pageSize = '100', sort = '-createdAt', search, searchBy, displayId, email, tel } = req.query;

    if (id) {
      const x = await Order.findByPk(id);
      return res.status(SUCCESS_CODE.OK).json({ orders: { docs: [x], total: 1 } });
    }

    if(displayId) {
      const originRecord = await Order.findOne({where: {displayId}})
      if(!originRecord) return res.status(SUCCESS_CODE.OK).json({ orders: { docs: [], total: 0 } });
      email = originRecord.email;
      tel = originRecord.tel;
    }

    let conditions = {}
    let tempConds = []
    if(email) tempConds .push({email})
    if(tel) tempConds.push({tel})
    if(tempConds.length) conditions = {[Op.or]: tempConds}

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

    Object.keys(combinedConditions).forEach(key => {
      if (combinedConditions[key] === undefined) {
        delete combinedConditions[key];
      }
    });

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
    // console.log("_____________CATCH: ", error);
    return res.status(ERROR_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Lỗi khi lấy danh sách đơn hàng' });
  }
});
module.exports = orderApi;
