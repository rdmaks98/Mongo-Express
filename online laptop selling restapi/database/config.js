const mongodb = require("mongoose");
mongodb.connect(`mongodb+srv://rinky:rinky512@cluster0.ffbzm.mongodb.net/Productapi?retryWrites=true&w=majority`,
    {
       useNewUrlParser:true,
       useUnifiedTopology:true,
       useCreateIndex:true,
       useFindAndModify:false 
    })
    .then( () =>{
        console.log(`databse is coonect success`);
    })
    .catch((erro) => {
        console.log(erro);
});