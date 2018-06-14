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
        .then((res) => {
            console.log('got results');
        })
        .catch((err) => console.error(err));



    res.send({result: 'Query is ' + query});
});

http.listen(process.env.PORT || 1266, function() {
    console.log("Server listening on port 1266");
});