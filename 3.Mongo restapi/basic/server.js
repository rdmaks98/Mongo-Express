const express = require("express");
const app = express();
const port = process.env.port || 7878;
const con = require("./database/connection"); 
const router = require("./router/router");
app.use(express.json());

app.use(router);
// create middleware
// const middleware = (req,res,next) => {
//     console.log("you have called middleware");
//     next();
// };

// port listen 
app.listen(port, () => {
    console.log(
      `server is connected successfully http://localhost:${port}`
    );
});
