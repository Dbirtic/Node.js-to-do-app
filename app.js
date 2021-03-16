// require modules
let express = require('express');
let todoController = require('./controllers/todo_controller');

let app = express();

// setup template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen to the port
app.listen(3000);
