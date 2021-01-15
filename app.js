const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");

const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todoListDB",{useNewUrlParser:true,useUnifiedTopology: true});

const itemsSchema=new mongoose.Schema({
  name:String
});
const Item=mongoose.model("Item",itemsSchema);

 const item1=new Item({
   name:"Welcome to your Todo List 📝"
 });
 const item2=new Item({
   name:"Hit the ➕ button to add a new item"
 });
  const item3=new Item({
    name:"Hit the ☑️ to delete an item "
  });

const defaultItems=[item1,item2,item3];

app.get("/",function(req,res){
//   var today= new Date();
//   // We are trying to grab day details using Method toLocaleDatestring
//   var options={
//     weekday:"long",
//     day:"numeric",
//     month:"long",
// };
//   var day= today.toLocaleDateString("en-US",options);
  // res.render("list",{kindOfDay:day}); same thing formatted
  // ALL THE ABOVE CODE CONVERTED TO MODULE JUST LIKE EXPRESS OR BODY PARSER
  let day=date();
  Item.find({},function(err,foundItems){
    if(foundItems.length===0){
      Item.insertMany(defaultItems,function(err){
        if(err)
        {console.log(err);}
        else
        {console.log("Succesfully added");}
      });
      res.redirect("/");
    }
    else{
      res.render("list",{
            kindOfDay:day,
            newListItems:foundItems
          });
    }
  });
});


app.post("/",function(req,res){
  var item=req.body.todo;
  const newitem=new Item({name:item});
  newitem.save();
  res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkedItemId=req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("Succesfully deleted this item");
      res.redirect("/");
    }
  });
});

app.listen(3000,function(){
  console.log("Server set up and running on port 3000");
});
