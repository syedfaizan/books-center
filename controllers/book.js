let { Book } = require("../models");
const { Op } = require("sequelize");

let bookCtrl = {
  create: (body) => {
    let {
      title,
      subtitle,
      description,
      website,
      ISBN,
      author,
      genre,
      published,
    } = body;
    return Book.create({
      title,
      subtitle,
      description,
      website,
      ISBN,
      author,
      genre,
      published,
    });
  },
  list: (params) => {
    let {
      title,
      author,
      genre,
      startDate,
      endDate,
      sortBy = "id",
      sortOrder = "DESC",
      size = 3,
      page,
    } = params;
    let query = {
      inStock: true, // Only find books which are in stock
    };
    size = parseInt(size);
    console.log("size: ", size);
    page = parseInt(page || 1);
    console.log("page: ", page);
    if (title) {
      query.title = {
        [Op.like]: title + "%",
      };
    }
    if (author) {
      query.author = {
        [Op.like]: author + "%",
      };
    }
    if (genre) {
      query.genre = genre;
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      query.published = {
        [Op.between]: [start, end],
      };
    }

    return Book.findAll({
      where: query,
      order: [[sortBy, sortOrder]],
      offset: (page - 1) * size,
      limit: size,
    }).then((books) => {
      return {
        items: books,
        page,
        nextPage: page + 1,
      };
    });
  },
  read: (id) => {
    return Book.findOne({
      where: {
        id,
      },
    });
  },
  remove: (id) => {
    return Book.destroy({
      where: {
        id,
      },
    }).then((res) => {
      return res;
    });
  },
};

module.exports = bookCtrl;
