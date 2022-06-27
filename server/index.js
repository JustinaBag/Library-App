const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Praktika1',
    database: 'booksystem',
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const book = req.body.book;
    const reservationFrom = req.body.reservationFrom;
    const reservationTo = req.body.reservationTo;

    db.query(
        "INSERT INTO books (name, age, country, book, reservationFrom, reservationTo) VALUES (?,?,?,?,?)", 
         [name, age, country, book, reservationFrom, reservationTo], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Values Inserted');
        }
      }
   );
});

app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.put('/update', (req, res) => {
const id = req.body.id;
const book = req.body.book;
db.query(
    'UPDATE books SET book = ? WHERE id = ?',
    [book, id], 
    (err, result) => {
    if (err) {
        console.log(err);
    }else{
        res.send(result);
    }
  }
);
});

 app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        'DELETE FROM books WHERE id = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
 });


app.listen(3001, () => {
    console.log('Yey, your server is running on port 3001');
});

