const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const Roll = req.body.Roll;
  if (Roll >= 1 && Roll <= 100) {

    console.log(`Name: ${name}, Email: ${email}, Roll Number: ${Roll}`);

    fs.readFile(__dirname + '/dataReceived.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const replacedData = data
        .replace('{{name}}', name)
        .replace('{{email}}', email)
        .replace('{{Roll}}', Roll);

      res.send(replacedData);
    });
  }
  else {
    res.status(400).send('Roll Number is not valid.');
  }
});

const errorhandler = (req, res) => {
  res.status(404).send(`
    <h1>404 Error: Page Not Found</h1>
  `);
};

app.use(errorhandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
