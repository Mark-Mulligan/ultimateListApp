const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const {
    User,
    List,
    Item
} = require('../models/user');

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {

        User.findById(req.user.id, function (err, user) {
            let searchResults = '';

            if (req.query.name != null && req.query.name !== '') {
                let searchParams = new RegExp(req.query.name, 'i');
                searchResults = user.lists.filter(function(list) {return searchParams.test(list.name)});
            } else {
                searchResults = user.lists;
            }

            res.render('lists/index.ejs', {
                lists: searchResults,
                searchOptions: req.query
            });
        })
    } else {
        res.redirect('/login');
    }
})

router.post('/', (req, res) => {
    const list = new List({
        name: req.body.newListName,
        items: [{
            name: 'Welcome to your new list!', checked: false
        }, {
            name: 'Use the add item input at the top to add items', checked: false
        }, {
            name: 'Click the trashcan to remove items -->', checked: false
        }]
    })

    User.findByIdAndUpdate(req.user.id, {
        $push: {
            lists: list
        }
    }, function (err, updatedDoc) {
        if (err) console.log(err);
        else {
            res.redirect(`lists/${list.id}`);
        }
    })
})

router.put('/', async (req, res) => {
    let listId = req.body.listId;
    let newName = req.body.newName;

    User.findOne({
        _id: req.user.id
    }, function (err, user) {
        if (err) console.log(err);
        else {
            user.lists.id(listId).name = newName;
            user.save(function (error) {
                if (error) console.log(error);
                else {
                    res.redirect('/lists');
                }
            });
        }
    });
});

router.get('/new', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('lists/new');
    } else {
        res.redirect('/login');
    }
});

router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let listId = req.params.id;

        User.findOne({
            _id: req.user.id
        }, function (err, user) {
            let targetList = user.lists.id(listId);

            res.render('lists/list', {
                name: targetList.name,
                items: targetList.items,
                listId: targetList._id
            })
        });
    } else {
        res.redirect('/login');
    }
})

router.delete('/:id', (req, res) => {
    let listId = req.params.id;

    User.findOne({
        _id: req.user.id
    }, function (err, user) {
        user.lists.id(listId).remove();
        user.save(function (error) {
            if (error) console.log(error);
            else {
                res.redirect('/lists');
            }
        })
    })
})

router.put('/:id', async (req, res) => {
    let listId = req.params.id;
    let newName = req.body.newName;

    User.findOne({
        _id: req.user.id
    }, function (err, user) {
        if (err) console.log(err);
        else {
            user.lists.id(listId).name = newName;
            user.save(function (error) {
                if (error) console.log(error);
                else {
                    res.redirect(`/lists/${listId}`);
                }
            });
        }
    });
})

router.post('/:id/edit', (req, res) => {
    let listId = req.params.id;
    let newItem = req.body.newItem;

    const item = new Item({
        name: newItem,
        checked: false
    });

    User.findOne({
        _id: req.user.id
    }, function (err, user) {
        if (err) console.log(err);
        else {
            user.lists.id(listId).items.push(item);
            user.save(function (error) {
                if (error) console.log(error);
                else {
                    res.redirect(`/lists/${listId}`);
                }
            })
        }
    })
});

router.patch('/:id/edit', (req, res) => {
    let listId = req.params.id;
    let itemId = req.body.itemId;
    let newName = req.body.newName;

    User.findOne({
        _id: req.user.id
    }, function (err, user) {
        if (err) console.log(err);
        else {
            user.lists.id(listId).items.id(itemId).name = newName;
            user.save(function (error) {
                if (error) console.log(error);
                else {
                    res.redirect(`/lists/${listId}`);
                }
            });
        }
    });
});

router.put('/:id/edit', (req, res) => {
    let listId = req.params.id;
    let listItems = [];

    User.findOne({
        _id: req.user.id
    }, function (err, user) {
        if (err) console.log(err);
        else {
            user.lists.id(listId).items = listItems;
            user.save(function (error) {
                if (error) console.log(error);
                else {
                    res.redirect(`/lists/${listId}`);
                }
            });
        }
    })
})

router.delete('/:id/edit', (req, res) => {
    let listId = req.params.id;
    let itemId = req.body.itemId;

    User.findOne({
        _id: req.user.id
    }, function (err, user) {
        if (err) console.log(err);
        else {
            user.lists.id(listId).items.id(itemId).remove();
            user.save(function (error) {
                if (error) console.log(error);
                else {
                    res.redirect(`/lists/${listId}`);
                }
            })
        }
    })
});

router.post('/:id/edit/checkbox/:itemId', (req, res) => {
    let listId = req.params.id;
    let itemId = req.params.itemId;
    let checked = req.body.checked;

    User.findOne({
        _id: req.user.id
    }, function (err, user) {
        if (err) console.log(err);
        else {
            user.lists.id(listId).items.id(itemId).checked = checked;
            user.save(function (error) {
                if (error) console.log(error);
                else {
                    res.json({
                        success: true,
                        message: "database updated",
                        data: `item checked = ${checked}`
                    });
                }
            });
        }
    });   
})

module.exports = router;