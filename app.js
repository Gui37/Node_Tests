const express = require ('express');
const morgan = require ('morgan');
const mongoose =require ('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require("dotenv");

dotenv.config();


//express app
const app  = express();

//connect to MongoDb
const dbURI=urlpass;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
//register view engines
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use('/public', express.static('public/stylesheets'));

app.use(express.urlencoded({ extended:true}));
app.use(morgan('dev'));

// mongoose routes
/*
app.get('/add-blog',(req, res) => {
    const blog = new Blog({
        title:'Novo Blog',
        snippet:'Sobre o Blog',
        body:'Mais sobre o Blog'
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });
});
//Listar os blogs
app.get('/all-blogs',(req, res) =>{
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) =>{
        console.log(err)
    })
});

app.get('/single-blog',(req,res) =>{
    Blog.findById('')
    .then((result)=>{
        res.send(result);
    })
    .catch((err) =>{
        console.log(err)
    })
})
*/
app.get('/',(req, res) =>{
    res.redirect('/blogs')
});

app.get('/about',(req, res) =>{
    res.render('about', { title:'Sobre'});
    //res.send('<p>about page<p>');
});

app.use('/blogs', blogRoutes);

//404 page deve ser o ultimo comando
app.use((req, res) => {
    res.status(404).render('404', {title:'404'});

})