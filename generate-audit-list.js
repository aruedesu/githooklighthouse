var csv = require('node-csv').createParser();
var files = [];
var url2Write = [];
var cgf = require("committed-git-files");
const createCsvWriter = require('csv-writer').createArrayCsvWriter;

cgf(function(err, results){
    for (i = 0; i < results.length; i++) {
        files.push(results[i].filename);
    }

    csv.parseFile('./url_map.csv', function(err, data) {
        for (i = 0; i < data.length; i++) {
            if(files.indexOf(data[i][0]) != -1){
                url2Write.push(data[i][1]);
            }
        }
        
        const csvWriter = createCsvWriter({
            header: ['URL'],
            path: './url_list.csv'
        });
         
        console.log(url2Write);
         
        csvWriter.writeRecords(url2Write)  
            .then(() => {
                console.log('Done');
            });
         

    }); 
});







 
// const records = [
//     {name: 'Bob',  lang: 'French, English'},
//     {name: 'Mary', lang: 'English'}
// ];
 
// csvWriter.writeRecords(records)       // returns a promise
//     .then(() => {
//         console.log('...Done');
//     });
 
// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English