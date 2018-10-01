var csv = require('node-csv').createParser();
var child = require('child_process');
var urls = "";

csv.parseFile('./url.csv', function(err, data) {
    for (i = 0; i < data.length; i++) {
        if(i == data.length - 1){
            urls += data[i];
        } else {
            urls += data[i]+",";
        }
    }
    child.execSync('lighthouse-batch --html -s ' + urls + ' -g', {stdio:[0,1,2]});
}); 