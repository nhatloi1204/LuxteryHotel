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

app.get('/', function(req, res) {
    res.render('home');
});
app.get('/intro', function(req, res) {
    res.render('intro');
});
app.get('/room', function(req, res) {
    res.render('room');
});
app.get('/event', function(req, res) {
    res.render('event');
});

app.listen(port, () => {
    console.log(`
              Example app listening on http://localhost:${port}
              `);
});