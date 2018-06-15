const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const funcs = require('./funcs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
})

app.post('/search', function(req, res) {
    let query = req.body.query;
    console.log('query: ', query);

    funcs.getVidNames(query)
        .then((result) => {
            console.log('got results');
            console.log(result);
            result.each((i, element) => {
                console.log('res.write('+element+')');
                res.write(JSON.stringify(element));
            });
            res.end();
            //res.send(JSON.stringify(funcs.strMapToObj(result)));
        })
        .catch((err) => console.error(err));
});

http.listen(process.env.PORT || 1266, function() {
    console.log("Server listening on port 1266");
});