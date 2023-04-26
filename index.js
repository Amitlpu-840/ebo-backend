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
  const RegNo = req.body.reg_num;

  console.log(`Name: ${name}, Email: ${email}, Registration Number: ${RegNo}`);

  fs.readFile(__dirname + '/dataReceived.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const replacedData = data
      .replace('{{name}}', name)
      .replace('{{email}}', email)
      .replace('{{regNum}}', RegNo);

    res.send(replacedData);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
