const notes = require('./db/db.json')
const express = require('express');
const path = require('path');
const fs  = require('fs');
// Helper method for generating unique ids
//const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for reviews
app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.json(notes);

});



// POST request to add a review
app.post('/api/notes', (req, res) => {

  // TODO: Add a comment describing the functionality of following line of code:
  const { title, text} = req.body;

  // TODO: Add a comment describing why we would check to see if the following properties exist before entering the code block
  if (title && text) {
    // Variable for the object we will save
    const newReview = {
      title,
      text,
      review_id: Math.floor(Math.random()* 100000),
    };

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);

    // TODO: Add a comment explaining the functionality of res.json()
notes.push(newReview)
fs.writeFileSync('./db/db.json', JSON.stringify(notes))

    res.json(notes);
  } else {
    // TODO: Add a comment describing the purpose of the else statement in this POST request.
    res.json('Error in posting review');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
