console.log('Starting app.js');

//const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

//console.log('PROCESS: ' , process.argv);
//console.log('YARGS: ' , yargs.argv);

var titleOption = {
            describe: 'TITLE OF THE NOTE',
            demand: true,
            alias: 't'
        };

var bodyOption = {
            describe: 'CONTENT OF THE NOTE',
            demand: true,
            alias: 'b'
        };
var argv = yargs
    .command('add','ADD A NEW NOTE',{
        title: titleOption,
        body: bodyOption
    })
    .command('list','LISTS ALL NOTE')
    .command('read','READS SPECIFIED NOTE',{
        title: titleOption
    })
    .command('remove','REMOVES SPECIFIED NOTE FROM DOC',{
        title: titleOption
    })
    .help()
    .argv;

var command = argv._[0];

if (command == 'add') {
//    console.log('Adding');
    var add = notes.addNote(argv.title,argv.body);
    if (add)
        console.log('Note with title', argv.title, 'successfully added.');
    else
        console.log('Note title', argv.title, 'already in use.');
}else if (command == 'read') {
//    console.log('Reading');
    notes.getNote(argv.title);
}else if (command == 'list') {
//    console.log('Listing');
    notes.getAll();
}else if (command == 'remove') {
//    console.log('Removing');
    notes.removeNote(argv.title);
}else {
    console.log('INCORRECT COMMAND');
}

