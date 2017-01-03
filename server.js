const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=> new Date().getFullYear());
hbs.registerHelper('screamIt',(text)=> text.toUpperCase() );
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var logs =  `${now} ${req.method} ${req.url}`;
    console.log(logs);
  fs.appendFile( 'server.log',logs + '\n',(err)=>{
    if (err) {
      console.log("unable to append logs to server.log");
    }
  } );
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintainence.hbs');
// });
app.use(express.static(__dirname + '/public/'));
app.get('/', (req,res) =>{
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    welcomeMessage : 'welcome to my website',
    currentYear : new Date().getFullYear()
}
)
});

app.get('/about', (req,res) => {
  res.render(
    'about.hbs',
    {
      pageTitle : 'About Page',
      currentYear : new Date().getFullYear()
    }
  )
});

app.get('/bad', (req,res) =>{
  res.send({
    ERROR : 'You Visited BAD PAGE',
    REASON : 'ITS ERROR! '
  })
});

app.listen(3000,()=>{
  console.log("Server is Running on Port 3000");
});
