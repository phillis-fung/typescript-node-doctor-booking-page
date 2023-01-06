const db = require('../services/db');
const config = require('../services/config');

function getDoctorList(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`
    SELECT * from doctor
    Inner JOIN (select id as districtId, district_name from District) ON doctor.district_id = districtId
    LIMIT ?,?
  `, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function getDoctorInfo(doctor_id) {
  const page = 1;
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`
    SELECT * from opening_hours
    Inner JOIN DayOfWeek ON Opening_hours.dayOfWeek = DayOfWeek.id
    where doctor_id = ?
    Order by dayOfWeek
    LIMIT ?,?
  `, [doctor_id, offset, config.listPerPage]);
  const meta = page;
  const success = data.length == 0 ? false : true;
  const message = "";

  return {
    success,
    data,
    message
  }
}

function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Author is empty');
  }
  
  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(quoteObj) {
  validateCreate(quoteObj);
  const {quote, author} = quoteObj;
  const result = db.run('INSERT INTO quote (quote, author) VALUES (@quote, @author)', {quote, author});
  
  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }

  return {message};
}

module.exports = {
  getDoctorList,
  getDoctorInfo,
  create
}