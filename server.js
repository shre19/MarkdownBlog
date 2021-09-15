if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express")
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate');
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
app.engine('ejs', ejsMate);

//const dbUrl = process.env.DB_URL
//'mongodb://localhost/blog'
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles});
})
app.use('/articles',articleRouter)

app.listen(3000)


