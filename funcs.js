const cheerio = require('cheerio');
const request = require('request');
const UrlSafeString = require('url-safe-string'); // Might want to use something else
const tagGenerator = new UrlSafeString();

exports.getVidNames = function(query) {
    console.log('In {getVidNames}, query is : ', query);
    let search_query = tagGenerator.generate(query);
    let url = 'https://www.youtube.com/results?search_query=' + search_query + '&page=&utm_source=opensearch';

    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            if (!error) {
                console.log('lel');
                let $ = cheerio.load(body);
                /*let vidNames = $('a').map(function(i, elem) {
                    console.log('vidName' + i + ': ', $(this).text());
                    return $(this).text();
                });*/
                let vidNames = $.html();
                resolve(vidNames);
            } else {
                console.log(error);
                reject(error);
            }
        })
    });
};