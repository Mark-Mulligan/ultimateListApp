const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    checked: Boolean
});

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [itemSchema]
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    lists: [listSchema]
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);
const List = mongoose.model('List', listSchema);
const Item = mongoose.model('Item', itemSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.User = User;
exports.List = List;
exports.Item = Item;
