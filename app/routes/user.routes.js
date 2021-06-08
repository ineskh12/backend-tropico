module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    // Create a new User
    app.post('/api/users', users.create);
    // Retrieve all Users
    app.get('/api/users', users.findAll);
    // Retrieve a single User with userId
    app.get('/api/users/:userId', users.findOne);
    // Update a Ad with userId
    app.put('/api/users/:userId', users.update);
    // Delete a Ad with userId
    app.delete('/api/users/:userId', users.delete);
    // Login route
    app.post('/api/login', users.login)
}
