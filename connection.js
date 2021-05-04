var express = require('express');
var app = express();
//const connection = require('./model/data');
var bodyParser =require('body-parser');
var path = require('path');
var router = express.Router();
const session = require('express-session');
const { response } = require('express');
app.use(express.static(__dirname));
app.use(express.json());
app.set('view engine','ejs');

app.use(session({secret:"expecto160900",
                resave:false,
                saveUninitialized:false}))

var mysql = require('mysql2');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
    database : 'movieTicketBooking',
    insecureAuth:true
});

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',function(request,respond) 
{
    respond.sendFile(path.join(__dirname + '/views/index.html')); 
});

app.get('/logout',function(request,respond) 
{
    respond.sendFile(path.join(__dirname + '/views/index.html')); 
});

app.get('/login',function(request,respond)
{
    if (request.session.loggedin)  {
        if(email==="admin@gmail.com")
        {
            connection.query('SELECT movieName,screenNo,sum(isBooked) FROM booking1', function(error, res1) {
                connection.query('SELECT movieName,screeNo,sum(isBooked) FROM booking2', function(error, res2) {
                    connection.query('SELECT movieName,screeNo,sum(isBooked) FROM booking2', function(error, res3) {
                        connection.query('SELECT movieName,screeNo,sum(isBooked) FROM booking2', function(error, res4) {
                            connection.query('SELECT movieName,screeNo,sum(isBooked) FROM booking2', function(error, res5) {
                                connection.query('SELECT movieName,screeNo,sum(isBooked) FROM booking2', function(error, res6) {
                                    res.render('admin', { rows : res1, rows2: res2,rows3: res3,rows4: res4,rows5: res5,rows6: res6 });
                                });
                            });
                        });
                    });
                });
              });
        }
        else{
            respond.sendFile(path.join(__dirname + '/views/home.html'));
        }
         
    }
    else
    {
        respond.send('Please login to view this page!');
    }
});

app.get('/home',function(request,respond) 
{
    if (request.session.loggedin)  {
        respond.sendFile(path.join(__dirname + '/views/home.html')); 
    }
    else
    {
        respond.send('Please login to view this page!');
    }
});
app.get('/successful',function(request,respond) 
{
    if (request.session.loggedin)  {
        respond.sendFile(path.join('Booking Successfull!!'));
        respond.sendFile(path.join(__dirname + '/views/home.html')); 
    }
    else
    {
        respond.send('Please login to view this page!');
    }
});

app.get('/register',function(request,respond) 
{
    respond.sendFile(path.join(__dirname + '/views/index.html')); 
});

app.get('/views/avengers',function(request,respond) 
{
    connection.query('SELECT isBooked FROM booking1',(err,result) => {
        if(err)
        {
            throw err;
        }
        else{
            if (request.session.loggedin){
            obj={booked:result};
            respond.render('booking',obj);
            }
            else
            {
                respond.send('Please login to view this page!');
            }
        }
    }) 
});

app.get('/views/pushpa',function(request,respond) 
{
    connection.query('SELECT isBooked FROM booking2',(err,result) => {
        if(err)
        {
            throw err;
        }
        else{
            if (request.session.loggedin){
            obj={booked:result};
            respond.render('booking',obj);
            }
            else
            {
                respond.send('Please login to view this page!');
            }
        }
    }) 
});

app.get('/views/sooraraipotru',function(request,respond) 
{
    connection.query('SELECT isBooked FROM booking3',(err,result) => {
        if(err)
        {
            throw err;
        }
        else{
            if (request.session.loggedin){
            obj={booked:result};
            respond.render('booking',obj);
            }
            else
            {
                respond.send('Please login to view this page!');
            }
        }
    }) 
});

app.get('/views/bharat',function(request,respond) 
{
    connection.query('SELECT isBooked FROM booking4',(err,result) => {
        if(err)
        {
            throw err;
        }
        else{
            if (request.session.loggedin){
            obj={booked:result};
            respond.render('booking',obj);
            }
            else
            {
                respond.send('Please login to view this page!');
            }
        }
    }) 
});

app.get('/views/thePriest',function(request,respond) 
{
    connection.query('SELECT isBooked FROM booking5',(err,result) => {
        if(err)
        {
            throw err;
        }
        else{
            if (request.session.loggedin){
            obj={booked:result};
            respond.render('booking',obj);
            }
            else
            {
                respond.send('Please login to view this page!');
            }
        }
    }) 
});

app.get('/views/avengersTelugu',function(request,respond) 
{
    connection.query('SELECT isBooked FROM booking6',(err,result) => {
        if(err)
        {
            throw err;
        }
        else{
            if (request.session.loggedin){
            obj={booked:result};
            respond.render('booking',obj);
            }
            else
            {
                respond.send('Please login to view this page!');
            }
        }
    }) 
});

app.post('/logout',(req,res) => {
    req.session.destroy();
    res.sendFile(path.join(__dirname + '/views/index.html'));
})



// app.get('/bookingSuccessfull',function(request,respond) 
// {
//     if (request.session.loggedin)
//     {
//         request.session.destroy();
//     }
//     else
//     {
//         respond.send("Please login to open this Page");
//     }
        
// })

// app.post('/book',(req,res) => {
//     res.send("hello");
// })
app.post('/register', function(request, response)
{
    var username = request.body.username;
    var password = request.body.password;    
    var email = request.body.email;
    connection.query('INSERT INTO users VALUES(?,?,?)',[username,email,password],(err, rows) => {
        if (err)
        {    
            throw err;
        }
        response.sendFile(path.join(__dirname + '/views/index.html'));
        // return response.redirect('/views/index.html');
    });
});

app.get('/index',function(request,respond) 
{
    respond.sendFile(path.join(__dirname + '/views/index.html')); 
});

app.post('/login',function(request,respond) 
{
    var email = request.body.email;
    var password = request.body.password;
    connection.query('SELECT password FROM users WHERE email LIKE ? AND password LIKE ?',[email,password],(err,result) => {

        if(err)
        {
            throw err;
            //respond.send("Check your Entries Again :)")
        } 
        else if(email==="admin@gmail.com" && result[0].password===password)
        {
            request.session.username = email;
        }
        
        else
        {
            if(result[0].password===password)
            {
                request.session.loggedin = true;
                request.session.username = email;
                respond.sendFile(path.join(__dirname + '/views/home.html'));
            }
            else{
                respond.sendFile(path.join(__dirname + '/views/index.html'));
            }
        }
    })
})
app.get('*',(request,respond)=>
{
    respond.send("Page Not Found");
});
app.listen(1609);
