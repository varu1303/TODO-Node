console.log('Starting notes.js');

const fs = require('fs');

var addNote = function (title,body) {
//    console.log('ADDING NOTE ', title, ' with BODY ',body);
    var notes = [];
    try {
      notes = fs.readFileSync('notes-data.json');  
      notes = JSON.parse(notes);
    } catch (e) {
        
    }
    
    var originalNote = {
        title : title,
        body : body
    };
    
    var duplicate = false;
//    var stringNote = JSON.stringify(originalNote);
//    console.log(typeof stringNote);
    notes.forEach(function (v,i) {
       if (v.title === originalNote.title) 
           duplicate = true;
    });
    
    if (duplicate == false)
        notes.push(originalNote);
    else 
        return false;
//    console.log('array ', notes);
    var stringNotes = JSON.stringify(notes);
    
    fs.writeFileSync('notes-data.json', stringNotes);
    return true;
}

var getAll = function () {
    var readNotes = [];
    
    try {
        readNotes= fs.readFileSync('notes-data.json');
        readNotes = JSON.parse(readNotes);
        readNotes.forEach(function (v,i) {
            console.log('NOTE READ -> ',v.title, 'Body of Note ', v.body); 
            
        });
    } catch (e) {
        console.log('ERROR ');
    }    
};

var getNote = function (title) {
//    console.log ('GETTING NOTE: ', title);
    
    var readNote = [];
    var found = false;
    
    try {
        readNote= fs.readFileSync('notes-data.json');
        readNote = JSON.parse(readNote);
        readNote.forEach(function (v,i) {
            if (v.title == title) {
                console.log('NOTE READ -> ',v.title, 'Body of Note ', v.body); 
                found = true;
            } else if (i == readNote.length-1 && found == false) {
                console.log('NO SUCH TITLE ', title);
            }
        });
    } catch (e) {
        console.log('ERROR ', title);
    }
//    var actualNote = JSON.parse(readNote);
//    console.log(typeof actualNote);
//    console.log(typeof readNote);
    
};

var removeNote = function (title) {
    console.log ('REMOVING NOTE: ', title);
    var remNote = [];
    
    try {
        remNote= fs.readFileSync('notes-data.json');
        remNote = JSON.parse(remNote);
        var newNote = remNote.filter(function (v,i) {
            if (v.title == title) {
                console.log('NOTE FOunD -> ',v.title); 
                return false;
            } else {
                return true;
            }
        });
        newNote = JSON.stringify(newNote);
        console.log('New file Data ', newNote);
    
        fs.writeFileSync('notes-data.json', newNote);
        
        
    } catch (e) {
        console.log('ERROR ', title);
    }
    
};

module.exports = {
    addNote: addNote,
    getAll: getAll,
    getNote: getNote,
    removeNote: removeNote
}; 