const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getFullYear', (optAg) => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    const logEntry = `${new Date().toString()} ${req.method}${req.url}`;
    fs.appendFileSync('server.log', logEntry + '\n', (e) => {
        console.log(e);
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'Welcome!',
        message: 'this is your space'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About me'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'bad boy'
    });
});

app.listen(port, () => {
    console.log('server started')
});