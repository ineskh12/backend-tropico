module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
     //login for web users
    // app.login('/login',users.login);
    // Create a new User
    app.post('/users', users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', users.findOne);

    // Update a Ad with userId
    app.put('/users/:userId', users.update);

    // Delete a Ad with userId
    app.delete('/users/:userId', users.delete);

    app.post('/login', users.login)

    
}
