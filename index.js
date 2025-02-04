const { config, engine } = require('express-edge');

const express=require('express');

const edge=require('edge.js');

const path=require('path');

const mongoose=require('mongoose');

const bodyParser=require('body-parser');

const connectMongo=require('connect-mongo');

const app= new express();  

mongoose.connect('mongodb://localhost/greendeck',{ useNewUrlParser: true,useUnifiedTopology: true  });

app.use(connectFlash());

const mongoStore=connectMongo(expressSession);

app.use(expressSession({
    secret:'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

const Post = require('./database/models/Post');

const { Router } = require('express');

app.use(fileUpload());
app.use(express.static('public'));
app.set('views', `${__dirname}/views`);
app.use(engine);

app.use('*',(req,res,next)=>{
    edge.global('auth',req.session.userID)
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const createPostController=require('./controllers/createPost');

const homePageController=require('./controllers/homePage');

const storePostController=require('./controllers/storePost');

const getPostController=require('./controllers/getPost');

const createUserController=require('./controllers/createUser');

const storeUserController=require('./controllers/storeUser');

const loginController=require('./controllers/login');

const loginUserController=require('./controllers/loginUser');

const logoutController=require('./controllers/logout');

// middleware

const storePost=require('./middleware/storePost');

const auth=require('./middleware/auth');

const redirectIfAuthenticated=require('./middleware/redirectIfAuthenticated');

app.use('/posts/store',storePost);
//app.use('/posts/new',auth);
app.get('/',homePageController);

app.get('/auth/register',redirectIfAuthenticated,createUserController);

app.get('/auth/login',redirectIfAuthenticated,loginController);

app.get('/auth/logout',auth,logoutController);

app.post('/users/login',redirectIfAuthenticated,loginUserController);

app.post('/users/register',redirectIfAuthenticated,storeUserController);

app.get('/posts/new',auth,createPostController);

app.post('/posts/store',auth,storePost,storePostController);

app.get('/post/:id',getPostController);

app.use((req,res)=>res.render('not-found'));

app.listen(3000,()=>{
    console.log('application is running on port 3000');
});