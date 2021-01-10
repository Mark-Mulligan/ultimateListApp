require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOveride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const app = express();

const indexRouter = require('./routes/index');
const listRouter = require('./routes/lists');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOveride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect(`mongodb+srv://admin-mark:${process.env.PASSWORD}@cluster723.acyoj.gcp.mongodb.net/ultimatelistDB?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

app.use('/', indexRouter);
app.use('/lists', listRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('server has been started on port 3000');
})