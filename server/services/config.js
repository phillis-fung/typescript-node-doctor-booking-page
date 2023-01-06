const env = process.env;

const config = {
  listPerPage: env.LIST_PER_PAGE || 10000,
}

module.exports = config;