const mongo = require("mongoose");
mongo.connect("mongodb://localhost:27017/Express_mongo",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => {
    console.log("database is created");
})
.catch((e) =>
{
    console.log(e);
});

const schemas = new mongo.Schema({ 
    name:String,
    gender:Boolean,
    email:String,
    password:String,
});

const collection = new mongo.model("user",schemas);
