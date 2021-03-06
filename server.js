const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getFullYear', (optAg) => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const logEntry = `${new Date().toString()} ${req.method} ${req.url}`;
    fs.appendFile('server.log', logEntry + '\n', (error) => {
        if (error) console.log(error);
    });
    next();
});

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

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        title: 'My Projects'
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