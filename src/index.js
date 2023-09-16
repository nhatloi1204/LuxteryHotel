const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const port = 3000;
const i18n = require('i18n');

const cookieParser = require('cookie-parser'); // Thêm middleware để xử lý cookie
// Sử dụng middleware cookie-parser để xử lý cookie
app.use(cookieParser());


// Cấu hình i18n
i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/public/locales',
    cookie: 'lang',
});


// Sử dụng i18n như một middleware
app.use(i18n.init);
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

const fs = require('fs'); // Import thư viện fs để đọc file

// Middleware để đọc dữ liệu từ file JSON và tạo biến dịch
function translationsMiddleware(req, res, next) {
    const currentLocale = req.cookies.lang || 'vi';

    // Đọc dữ liệu từ file JSON
    const jsonData = JSON.parse(fs.readFileSync(__dirname + '/public/locales/vi.json', 'utf8'));

    const translations = {};

    // Tạo các biến tương ứng từ dữ liệu JSON
    for (const key in jsonData) {
        translations[key] = res.__({ phrase: key, locale: currentLocale });
    }

    // Gắn biến dịch vào res.locals để chúng có thể được sử dụng trong tất cả các trang
    res.locals.translations = translations;

    next(); // Tiếp tục xử lý yêu cầu
}

// Sử dụng middleware translationsMiddleware cho tất cả các yêu cầu
app.use(translationsMiddleware);

// Đoạn mã middleware trên sẽ đảm bảo biến 'translations' có sẵn trong res.locals cho mọi yêu cầu.


app.get('/', function (req, res) {
    const translations=res.locals.translations;
    res.render('home', translations);
});



app.get('/intro', function (req, res) {
    res.render('intro');
});
app.get('/room', function (req, res) {
    res.render('room');
});
app.get('/event', function (req, res) {
    const eventName = req.query.e;
    if (eventName == 'astra') {
        res.render('astra');
    } else if (eventName == 'meeting') {
        res.render('meeting');
    }
    else if (eventName == 'ownway') {
        res.render('ownway');
    } else {
        res.render('event');
    }

});
app.get('/dining', function (req, res) {
    res.render('dining');
});
app.get('/reviews', function (req, res) {
    res.render('reviews');
})
app.get('/facilities', function (req, res) {
    res.render('facilities')
})
// Xử lý yêu cầu thay đổi ngôn ngữ
app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000 });
    res.redirect('back');
});

app.listen(port, () => {
    console.log(`
              Example app listening on http://localhost:${port}
              `);
});
