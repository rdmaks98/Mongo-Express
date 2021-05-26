const mongoose = require("mongoose");
mongoose
.connect(`mongodb+srv://rinky:rinky512@cluster0.ffbzm.mongodb.net/restapi?retryWrites=true&w=majority`,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    }
    ).then(() => {
        console.log("databas is connected succesfully");
    }
    ).catch((err) => {
        console.log(err);
});
