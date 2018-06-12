const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.post('/search', function(req, res) {
    var query = req.body.query;
    console.log('query: ', req.body);
    res.send('Query is ' + query);
});

http.listen(process.env.PORT || 1266, function() {
    console.log("Server listening on port 1266");
});