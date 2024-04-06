const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

const app = express();

const dbURI = 'mongodb+srv://Younes:w37UUKvKUHniWsaN@cluster0.4k2zdr1.mongodb.net/first-try';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => app.listen(3000))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    //console.log(req.locals.path)
    //console.log(req.path)
    res.locals.path = req.path;
    next();
})
// routes
app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'} );
});
//app.get
/*app.post('/test2', (req, res) => {
    const seaa = req.body.sea
    console.log(seaa)
    res.send('Hello ' + seaa);
}) */

app.use('/posts', postRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})

