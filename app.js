var bodyParser = require("body-parser"),
express        = require("express"),
mongoose       = require("mongoose"),
app            = express();


mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//Mongoose/model config
var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);



//ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error!");
        } else{
            res.render("index", {blogs: blogs});
        }

    });
});

//NEW ROUTE

app.get("/blogs/new", function(req, res){
    res.render("new");

});

//CREATE ROUTE

app.post("/blogs", function(req, res){
    //create blog
    //redirect

    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    })
})








app.listen(3000, function(){
    console.log("server running...");
});