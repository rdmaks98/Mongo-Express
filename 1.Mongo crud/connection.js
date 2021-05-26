// connect and create database
const mongo = require("mongoose");
mongo.connect("mongodb://localhost:27017/Express_mongo",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("database is done successfully");
})
.catch((e)=>
{
    console.log(e);
});

//make schemas datatype and column
const schemas = new mongo.Schema({
    name:{
        type:String,
        require:true,
    },
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date:{
        type:Date,
        default:Date.now,
    },
});

// collection that means table
const collection = new mongo.model("playlist data",schemas);

// insert data
const createdocument = async () => {
    try{
        const nodeplaylistdata = new collection({
            name:"Node js",
            ctype:"Backend",
            videos:10,
            author:"mast kiara",
            active:true,
        });
const result = await nodeplaylistdata.save();
// console.log(result);
}
catch(err){
console.log(err);
}
};
// createdocument();

const singledata = async () => {
    try{
        const Websitedesign = new collection({
            name : "Websitedesigns",
            ctype:"Frontend",
            videos:7,
            author:"Rinky Makvana",
            active:false,
        });
        const result = await Websitedesign.save();
        console.log(result);
    }
    catch(e){
        console.log(e);
    }
};
// singledata();
const multipledata = async () => {
    try{
        const reactPlaylist = new collection({
            name: "React JS",
            ctype: "Frontend",
            videos: 45,
            author: "ITVMH DEVELOPERS",
            active: true,      
        });
        const phpPlaylist = new collection({
            name: "PHP",
            ctype: "Backend",
            videos: 80,
            author: "ITVMH DEVELOPERS",
            active: true,
          });
          const djangoPlaylist = new collection({
            name: "Django",
            ctype: "Backend",
            videos: 90,
            author: "ITVMH DEVELOPERS",
            active: true,
          });
          const expressPlaylist = new collection({
            name: "Express JS",
            ctype: "Backend",
            videos: 30,
            author: "ITVMH DEVELOPERS",
            active: true,
          });
          const angularPlaylist = new collection({
            name: "Angular ",
            ctype: "Frontend",
            videos: 130,
            author: "ITVMH DEVELOPERS",
            active: true,
          });
          const mongooesPlaylist = new collection({
            name: "mongooes JS",
            ctype: "Database",
            videos: 10,
            author: "ITVMH DEVELOPERS",
            active: true,
          });
          const javascript = new collection({
            name: "Javascript",
            ctype: "FrontEnd",
            videos: 10,
            author: "ITVMH DEVELOPERS",
            active: true,
          });
          const uiux = new collection({
            name: "uiux",
            ctype: "Design",
            videos: 10,
            author: "ITVMH DEVELOPERS",
            active: true,
          });
          const flutterPlaylist = new collection({
            name: "Flutter",
            ctype: "Native Mobile Development",
            videos: 10,
            author: "ITVMH DEVELOPERS",
            active: true,
          });
          const react_nativePlaylist = new collection({
            name: "React Native",
            ctype: "Native Mobile Development",
            videos: 10,
            author: "ITVMH DEVELOPERS",
            active: true,
        });
        const result = await collection.insertMany([
            reactPlaylist,
            phpPlaylist,
            djangoPlaylist,
            expressPlaylist,
            angularPlaylist,
            javascript,
            uiux,
            mongooesPlaylist,
            flutterPlaylist,
            react_nativePlaylist,
        ]);
        console.log(result);      
    }
    catch(err)
    {
        console.log(err);
    }
};
// multipledata();

// read
const readdata = async() =>{
    const result = await collection.find({ctype:"Frontend"}).select({
        name:1,
        active:1,
    })
    .limit(4)
    .skip(1);
    console.log(result);
}
// readdata();

const advancereaddata = async()=>{
    const result = await collection.find({
        ctype: "Native Mobile Development",
    });
    const skipdata = await collection.find({
        ctype:"PHP"
    })
    .skip(1)
    .limit(1);
    
    const select = await collection.find({
        ctype:"PHP"
    })
    .select({ name :1});

    const multipleselect = await collection.find({
        ctype:"PHP"
    })
    .select({ name:1, ctype:1});

    console.log(result);
    console.log(skipdata);
    console.log(select);
    console.log(multipleselect);
}
// advancereaddata();

// update
const updatedata = async (id) =>{
    const result = await collection.update(
        {_id : id},
        {
            $set: {
                name : "PHP(framework)",
            },
        }
    );
    console.log(result);
};

const objectdestructuring = async(_id) => {
    const findbyid = await collection.findByIdAndUpdate(
        {_id},
        {
            $set:
            { name : "PHP(laravel)"},
        },
        {useFindAndModify:false,new:true}
    );

const findone = await collection.findOneAndUpdate(
    {_id},
    {
        $set :{
            name : "this is demo language",
            ctype:"coading",
        },
    },
    {useFindAndModify:false}
);
// console.log(findone);
};

// updatedata("6064a9966b995851fce07224");
// objectdestructuring("6064a9966b995851fce07224");

const fakedata = async () => {
    try{
        const insert = new collection({
            name :"typems",
            ctype:"designing",
            video:2,
            author:"l.m.kaya",
            active:false,
        });
        const result = await insert.save();
        console.log(result); 
    }
    catch(err){
        console.log(err);
    }
}
// fakedata();

const deletedata = async(_id) => {
    try{
        const result = await collection.findByIdAndDelete({
            _id
        });
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
};
// deletedata("6065c7537ed0186d44db1efa");