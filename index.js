const Twit = require('twit')
const franc = require('franc')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'dados.csv',
    header: [
        {id: 'lingua', title: 'lingua'},
        {id: 'texto', title: 'tweet'}
    ]
});

const apikey = 'xxxxxxxx'
const apiSecretKey = 'xxxxxxxxxxxxxxxxxxxxxxx'
const accessToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
const accessTokenSecret = 'xxxxxxxxxxxxxxxxxxx'

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});

(async () => {
  var dados = []
    var stream = T.stream('statuses/filter', { track: '#Deus, #espirito-santo, #igreja-do-senhor, #jesus, #trindade, jesus cristo, Deus, Deus pai, Deus filho, espirito santo, biblia, biblia sagrada, Deus é amor, Deus me perdoa, apaixonado por cristo, cristo é o caminho, versiculo biblico, #versiculo',  language: 'pt-br, br, pt, ptbr'  })
    stream.on('tweet', function (tweet) {
        console.log(tweet.text);
        console.log('Language: ' + franc(tweet.text));
        console.log('------');
        var texto = tweet.text
        var lingua = franc(tweet.text)
        dados.push({texto, lingua})

        fs.writeFile('dados.json',  JSON.stringify(dados, null, 2), err => {
          if(err) throw new Error('deu ruim')
        })

        csvWriter.writeRecords(dados)       // returns a promise
        .then(() => {
          console.log('...fim...');
        });
    })
   

    
})();

