const express = require('express');
const bodyParser = require('body-parser');

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

  res.send(`
    <h1>Data Received:</h1>
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Registration Number</th>
      </tr>
      <tr>
        <td>${name}</td>
        <td>${email}</td>
        <td>${RegNo}</td>
      </tr>
    </table>
  `);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});