console.log('yeah');
var fs = require('fs');
var fsfolder = require('fs-extra');
var newdir = 'docs/5.0.0';

if (!fs.existsSync(newdir)){
    fs.mkdirSync(newdir);
}

fsfolder.copy('dist/mine', newdir, function (err) {
    if (err) return console.error(err)
    console.log('success!')
  });