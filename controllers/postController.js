const Post = require('../models/post');

const post_test2 = ( req, res) => {
    crt = req.body.sea
    console.log(crt);
    Post.find({ $or: [ {startPoint: crt}, {endPoint: crt} ] })   
    .then( result => res.render('index', { posts: result, title: 'Search Results'}))
    .catch( err => console.log(err))
}

const post_test = (req, res) => {
    crt = req.body.sea
    Post.find({startPoint: crt})
    .then( result =>{
        console.log(result)
        //res.render('index', {posts: result, title: 'Search Results'})
        res.json(result)
    } )
    .catch( err => console.log(err));
   /* crt = req.body.sea;
    result =  Post.find({startPoint:'blida'}) ;
    console.log(result)

    user = {
        "id": 123,
        "name": "Alice",
        "email": "alice@example.com"
      }
    console.log((req.body.sea));*/
}



const post_index2 = (req, res) => {
    Post.find({startPoint: "blida"})
        .then( result => res.render('index', {posts: result, title: 'All posts'}))
        .catch( err => console.log(err));

};

const post_index = (req, res) => {
    Post.find().sort( {createdAt: -1} )
        .then( result => res.render('index', {posts: result, title: 'All posts'}))
        .catch( err => console.log(err));

};

const post_details = (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then( result => res.render('details', { post: result, title: 'Post Details' }))
        .catch( err => {
            console.log(err);
            res.render('404', {title: 'Post not found' });
        });
}

const post_create_get = (req, res) => {
    res.render('create', { title: 'Create a new post' });
}

const post_create_post = (req ,res) => {

    //console.log(req.body.startPoint);
    const post = new Post(req.body);
    post.save()
        .then( result => res.redirect('/posts'))
        .catch( err => console.log(err));
}

const post_delete = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
        .then( result => res.json( {redirect: '/posts'}))
        .catch( err => console.log(err));
}


module.exports = { post_index, post_details, post_create_get, post_create_post, post_delete, post_index2, post_test, post_test2 }