const ep = require("express");
const ap = ep();
const port = process.env.port || 2020;
const con = require("./database/config");
const router = require("./router/router");
ap.use(ep.json());
ap.use(router);

ap.listen(port, () => {
    console.log(`server is connected succesfully ${port}`);
});


