var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' ,'hbs');

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});
hbs.registerHelper('WelcomeNote',(text) => {
  return text.toUpperCase();
});

//middleware
app.use((req,res,next) => {
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err) => {
    console.log('Unable to append file  to server.log');
  });
  next();
});

/*
app.use((req,res,next) => {
  res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
//  res.send('<h1>hello express</h1>');
/*res.send({
    name:'vineeet',
    likes:['biking','coding']
  });
});*/
res.render('Home.hbs',{
  pageTitle: 'Home Page',
  welcome:'Welcome to my frst ever website'
});
});


app.get('/about',(req,res) => {
//  res.send('<h1>hello express</h1>');
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/project',(req,res) => {
  res.render('projects.hbs',{
    pageTitle:'Projects',
    portfolio: 'This will be our portfolio'
  })
});

app.get('/bad',(req,res) => {
//  res.send('<h1>hello express</h1>');
res.send({
    errorMessage:'Request cant be fulfilled'
  });
});

//starting the Server 
app.listen(port, () => {
  console.log(`The server is listening on port:${port}`);
});
