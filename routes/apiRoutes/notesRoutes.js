const router = require('express').Router();
let { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
  //read and return JSON
  let results = notes;
  //console.log(notes);
  res.json(results);
});

router.post('/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const note = req.body;
  console.log (note);
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes }, null, 2)
    );
    res.json(note);
  });

  function filterById(myid, notes) {
    const filteredNotes = notes.filter(note => note.id != myid);
    return filteredNotes;
  };

  router.delete('/notes/:id', (req, res) => {
    //const note = req.body;
    console.log ("delete:", req.params.id);
    //notes.splice((req.params.id),1);
    notes = filterById(req.params.id, notes);
   // myNotes = filterById(req.params.id, notes);
    result = fs.writeFileSync(
      path.join(__dirname, '../../db/db.json'),
      JSON.stringify({notes} , null, 2)
      //JSON.stringify({"notes": myNotes} , null, 2)
      )
    //console.log(notes);   
    res.json(req.params.id);
      
    });



module.exports = router;
