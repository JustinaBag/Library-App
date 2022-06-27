import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [book, setBook] = useState('');
  const [reservationFrom, setReservationFrom] = useState(0);
  const [reservationTo, setReservationTo] = useState(0);

  const [newBook, setNewBook] = useState(0);

  const [bookList, setBookList] = useState([]);

  const addBook = () => {
      Axios.post('http://localhost:3001/create', {
        name: name, 
        age: age, 
        country: country, 
        book: book, 
        reservationFrom: reservationFrom,
        reservationTo: reservationTo
      }).then(() => {
        setBookList([
          ...bookList, 
        {
        name: name, 
        age: age, 
        country: country, 
        book: book, 
        reservationFrom: reservationFrom,
        reservationTo: reservationTo
        },
      ]);
    });
  };

const getBook = () => {
    Axios.get('http://localhost:3001/books').then((response) => {
      setBookList(response.data);
    });
};

const updateBookName = (id) => {
  Axios.put('http://localhost:3001/update', { book: newBook, id: id }).then((response)=>{
    setBookList(bookList.map((val)=> {
      return val.id === id 
      ? {
        id: val.id, 
        name: val.name, 
        country: val.country, 
        age: val.age, 
        book: newBook, 
        reservationFrom: val.reservationFrom,
        reservationTo: val.reservationTo
      } 
      : val;
    })
    );
  }
  );
};

const deleteBook = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
    setBookList(bookList.filter((val)=> {
      return val.id !== id;
    }))
  });
};

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input 
        type="text" 
        onChange={(event) => {
          setName(event.target.value);
          }}
          />

    <label>Age:</label>
    <input 
    type="number" 
      onChange={(event) => {
          setAge(event.target.value);
          }}
    />

    <label>Country:</label>
    <input 
    type="text" 
      onChange={(event) => {
          setCountry(event.target.value);
          }}
    />

    <label>Book Name:</label>
    <input 
    type="text" 
      onChange={(event) => {
          setBook(event.target.value);
          }}
    />

    
<label>Reservation date from:</label>
    <input 
    type="date" 
      onChange={(event) => {
        setReservationFrom(event.target.value);
          }}
    />
    <label>Reservation date to:</label>
    <input 
    type="date" 
      onChange={(event) => {
        setReservationTo(event.target.value);
          }}
    />

    <button onClick={addBook}>Add Book</button>
    </div>

    <hr className="line__style"/>  

        <div className="books">
        <button onClick={getBook}>Show All Books</button>

        {bookList.map((val, key) => {
          return (
            <div className="employee"> 
            <div>
            <h3>Name: {val.name}</h3> 
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>Book Name: {val.book}</h3>
            <h3>Reservation From: {val.reservationFrom}</h3>
            <h3>Reservation To: {val.reservationTo}</h3>
            </div>
            <div> <input type="text" placeholder="2000..."
              onChange={(event) => {
                setNewBook(event.target.value);
          }}
            />
            <button onClick={() => 
            {updateBookName(val.id)}}>Update Registration</button>

            <button onClick={() =>{deleteBook(val.id)}}>Delete Book</button>
            </div>
            </div>
            );
        })}
    </div>
    </div>
  );
}

export default App;
