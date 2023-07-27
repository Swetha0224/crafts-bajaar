const express=require('express')
const bodyparser=require('body-parser')
const ejs=require('ejs')
const mongoose=require('mongoose')
const LocalStorage=require('node-localstorage').LocalStorage
localStorage=new LocalStorage('./scratch')
const cookieparser=require('cookie-parser')

const app=express()
app.use(express.static('public')) //public folder
app.use(bodyparser.urlencoded({extended:true}))  // to use bp
app.set("view engine","ejs") //to use ejs
app.use(cookieparser())


mongoose.connect("mongodb+srv://ambicathakasi:bgfieOAvR7Eu6t92@cluster0.qbafcuo.mongodb.net/")
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  });
  const User = mongoose.model('User', userSchema);

//app.get == server giving page to user
//app.post == getting user data to server 

const addSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    quant: { type: Number, required: true }, 
    price : { type: Number, required: true }, 
    cat: { type: String, required: true },
});

const Add = mongoose.model('Add',addSchema);

// const x=new Add({name:"table",image:"https://www.ikea.com/in/en/images/products/nodeland-coffee-table-medium-brown__0974637_pe812499_s5.jpg",quant:10,price:150,cat:"bamboo"});

//  x.save()

app.get("/",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("index",{n:k})
})

app.get("/admin",function(req,res){
    
     res.render("admin")
})

app.get("/add",function(req,res){
     res.render("add")
   

})

// app.get("/delete",function(req,res){
//     res.render("new")
// })

app.get("/new",function(req,res){
    Add.find({},function(err,y){
        res.render('new',{datas:y});
    })
})

app.get("/logout",function(req,res)
{
    var k = req.cookies.Userstatus;
    localStorage.removeItem(k);
    res.clearCookie("User status");
    res.redirect('/')
})
app.get("/about",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("about",{n:k})
})
app.get("/bamboo",function(req,res)
{
    var k=req.cookies.Userstatus

    Add.find({cat:"bamboo"},(err,y) => {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(y)
            res.render("bamboo",{n:k,data:y});
        }
    });
    
    // res.render("bamboo",{n:k})
})
app.get("/cart",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("cart",{n:k})
})
app.get("/clay",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("clay",{n:k})
})
app.get("/cloth",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("cloth",{n:k})
})


app.get("/contact",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("contact",{n:k})
})

app.get("/features",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("features",{n:k})
})
app.get("/jute",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("jute",{n:k})
})
app.get("/leather",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("leather",{n:k})
})
app.get("/login",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("login",{n:k})
})
app.get("/products",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("products",{n:k})
})
app.get("/register",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("register",{n:k})
})

app.get("/review",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("review",{n:k})
})
app.get("/shell",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("shell",{n:k})
})
app.get("/stone",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("stone",{n:k})
})
app.get("/wood",function(req,res)
{
    var k=req.cookies.Userstatus
    res.render("wood",{n:k})
})



app.post("/register",function(req,res){
    const name=req.body.name
    const email=req.body.email
    const pass=req.body.password
    const newUser = new User({
        name: name,
        email: email,
        password: pass,
    
      });
    User.findOne({email:email}).then((data)=>{
        try{
            if(data){
                
                res.redirect("/login")
                
            }
            else{
                newUser.save()
                res.redirect("/login")
            }
        }
        catch{
            console.log(err);
        }
    })
    
})

app.post("/add",function(req,res){
    const name=req.body.name
    const image=req.body.image
    const quant=req.body.quant
    const price=req.body.price
    const cat =req.body.cat
    const Add1 = new Add({
        name: name,
        image: image,
        quant: quant,
        price: price,
        cat:cat,
    
      });
    Add.findOne({name:name}).then((data)=>{
        try{
            if(data){
                
                res.redirect("/add")
                
            }
            else{
                Add1.save()
                res.redirect("/admin")
            }
        }
        catch{
            console.log(err);
        }
    })
    
    
})
app.post("/delete/:pid",function(req,res){
    const s=req.params.pid;
    console.log(s)
    Add.findByIdAndRemove(s,function(err){
        if(err)
        {
            console.log(err)
        }
        else{
            console.log("success")
            res.redirect("/new")
        }
         
    });
});
// app.post("/contact",function(req,res){
//     const name=req.body.name
//     const email=req.body.email
//     const message=req.body.message
//     const text=req.body.text
//     if(name&&email&&message&&text)
//     {
//         res.redirect("/contact")
//     }
//     else{
//         prompt("")
//     }
// })


app.post("/login",function(req,res){
    const email=req.body.email
    const pass=req.body.password
    User.findOne({email:email}).then((data)=>{
        if(!data){
            res.redirect("/register")
        }
        else{
            if(pass==data.password){
                res.cookie("Userstatus",email)
             localStorage.setItem(email,JSON.stringify(data))
            // localStorage.setItem(data.name)
            // console.log(JSON.stringify(data.name))
                res.redirect("/")
            }
            else{
                res.write("<div style='margin:auto; align-items:center;margin-top:50px;width:24%;height:15%;padding:10px;'><h1 style='margin-top:4px'>Invalid credentials<br><a href='/login'>Back to Login Page</a></h1></div>")
            }
        }
    })

})












app.listen(8000,()=>{
    console.log("hello!!")
})