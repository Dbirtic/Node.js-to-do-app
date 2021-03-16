let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// connect to the mongodb database
mongoose.connect('mongodb://localhost/Todo_list', {useNewUrlParser:true});

// create a schema - blueprint of mongodb data that we are going to input
let todoSchema = new mongoose.Schema({
    item: String
});

let todoModel = mongoose.model('list', todoSchema);

//let data = [{item: 'get milk'}, {item: 'get good'}, {item: 'get better'}];

let urlencoddedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        // get data from mongodb and pass it to the view
        todoModel.find({}, function(err, data){
            if(err)
                throw err;
                res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencoddedParser, function(req, res){
        // get data from the view and add it to the mongodb
        let newTodo = todoModel(req.body).save(function(err, data){
            if(err)
                throw err;
            res.redirect('/todo');      // sends as a response data as json
        });
    });

    app.delete('/todo/:item', function(req, res){
        // delete requested item from mongodb
        todoModel.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

};