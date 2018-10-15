const math = require('./math');
const express = require("express");

var something = math.add(1,2);

console.log("1 + 2 = " + something);

const app = express();

app.use("/", function(req, res, next)
{
    res.send("Hllow world");
});


app.listen(3000);