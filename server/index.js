const express = require('express');

const game = require('./game/controller');



const app = express();



const port = 80;

const server = "localhost";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/", express.static(__dirname + "/../dist/")); //static middleware looks at path & sends it bck to client
//take every url & pass it to the static function
app.use('/game', game);



app.listen(port);


// eslint-disable-next-line no-console
console.log(`listening on: http://${server}:${port}`);