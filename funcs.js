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
                let vidNames = $('.yt-lockup-content').map(function(i, elem) {
                    let name = $(this).children('.yt-lockup-title').text();
                    let url = 'https://www.youtube.com' + $(this).children('.yt-lockup-title').children('a').attr('href');
                    let channel = $(this).children('.yt-lockup-byline').html();
                    console.log('vidName' + i + ': ' + name + ', URL: ' + url + ', channel: ' + channel);
                    return {name: name, url: url, channel: channel};
                });
                //let vidNames = $.html();
                resolve(vidNames);
            } else {
                console.log(error);
                reject(error);
            }
        })
    });
};