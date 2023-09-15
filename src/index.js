const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const port = 3000;

app.engine(
    'hbs',
    hbs.engine({
        extname: 'hbs',
        helper: {},
    }),
);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/intro', function (req, res) {
    res.render('intro');
});
app.get('/room', function (req, res) {
    res.render('room');
});
app.get('/event', function (req, res) {
    const eventName = req.query.e;
    if(eventName=='astra'){
        res.render('astra');
    }else if(eventName=='meeting'){
        res.render('meeting');
    }
    else if(eventName=='ownway'){
        res.render('ownway');
    }else{
        res.render('event');
    }
    
});
app.get('/dining', function (req, res) {
    res.render('dining');
});
app.get('/reviews',function(req,res){
    res.render('reviews');
})
app.get('/facilities',function(req,res){
    res.render('facilities')
})

app.listen(port, () => {
    console.log(`
              Example app listening on http://localhost:${port}
              `);
});
