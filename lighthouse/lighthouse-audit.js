var readCSV = require('nodecsv').readCSV;
var child = require('child_process');
var path = require('path'), fs=require('fs');
var config = require('./config.json');
var jsonfile = require('jsonfile');
var file = './lighthouse/config.json';



function fromDir(startPath,filter,callback){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter,callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};
console.log(config.root + config.module);
fromDir(config.root + config.module,/\.csv$/,function(filename){
    var parseDir = filename.replace(/\\/g, '/');
    var urls = '';

    readCSV(parseDir, function(error, data){
        for (i = 0; i < data.length; i++) {
            if(i == data.length - 1){
                urls += data[i];
            } else {
                urls += data[i] + ',';
            }
        }
       child.execSync('lighthouse-batch --html -s ' + urls + ' -g', {stdio:[0,1,2]});
    });
}); 