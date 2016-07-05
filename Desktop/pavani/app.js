var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
Genre = require('./models/genre');
Book = require('./models/book');

var app = express();

Book = require('./models/book');
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/*app.get('/index',function(req, res){
	res.sendFile( __dirname + "/" + "plain.html" );
});*/


app.get('/api/books',function(req, res)
{
	Book.getBooks(function(err,books){
		if(err)
		{
			throw err;
		}
		
		res.send(JSON.stringify(books));
	});
});

app.get('/api/books/:_id',function(req, res)
{
	Book.getBookById(req.params._id, function(err,book){
		if(err)
		{
			throw err;
		}
		
		res.send(book);
	});
});

app.post('/api/books',function(req, res){
	
	var book =  ({ title : req.body.Bname,
	              author: req.body.Aname,
                  pages: req.body.Pnum  }) ;
				  
	
	Book.addBook(book, function(err, book){
		if(err)
		{
			res.send("Please enter all the fields");
		}
		res.setHeader('Content-Type', 'text/html');
		
		var html = '<html>'+
'<body>'+
'<center>'+
'<h3>'+
'<b><u>Added Book</u></b>'+

'</h3>'+
'<br>'+
'<br>'+
'<table border="1" style="width:25%" >'+
'<thead>'+
  '<tr>'+
    '<th>Book Title</th>'+
    '<th>Author</th>'+		
    '<th>Pages</th>'+
  '</tr>'+
  '</thead>'+
  '<tbody>'+
  '<tr>'+
    '<td>'+book.title+ '</td>'+
    '<td>'+ book.author+ '</td>'+		
    '<td>'+ book.pages+ '</td>'+
  '</tr>'+
  '</tbody>'+
 
'</table>'+
'</center>'+
'<center>'+
'<a href=/>Add Another Book</a>'+
'</center>'+
'</body>'+
'</html>';

		res.send(html);
		
		
	});
});

app.listen(3000);
console.log("running on 3000");