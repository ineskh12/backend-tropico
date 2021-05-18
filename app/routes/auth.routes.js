const auth = require('../controllers/auth.controller.js');

module.exports = (app) => {
  app.get('/auth', auth.create);
}
