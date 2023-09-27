const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Subject = require('./models/subject');
const passport= require('passport');
const LocalStratergy = require('passport-local');
const User = require('./models/user');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const { isLoggedIn } = require('./middleware');
const userRoutes = require('./routes/users');
const lectureRoutes = require('./routes/lectures');
const Teacher = require('./models/teacher');
mongoose.connect('mongodb://127.0.0.1:27017/attendance',{useNewUrlParser:true,useUnifiedTopology:true})

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('database connected');
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true, 
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()))


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{ 
    res.locals.currentUser=req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.get('/', async (req, res) => {
    try {
        res.render('home')
    } catch (e) {
        console.log(e)
    }
})


//routers
app.use('/',userRoutes)
app.use('/lecture', lectureRoutes)

app.get('/create-subject', isLoggedIn, async (req, res) => {
    try {
        const teachers = await Teacher.find({})
        console.log(teachers)
        res.render('create/index', {teachers})
    } catch (e) {
        console.log(e)
    }
})
app.post('/create-subject', isLoggedIn,  async (req, res) => {
    try {
        const sub = await Subject.create(req.body)
        console.log(sub)
        res.redirect('/lecture')
    } catch (e) {
        console.log(e)
    }
})

// error middleware
app.use((err,req,res,next)=>{
    const {statusCode = 500}=err;
    if(!err.message) err.message = 'oh no'
    res.status(statusCode).render('error',{err})    
})
  


app.listen(3000,()=>{
    console.log('Server on port 3000')
})