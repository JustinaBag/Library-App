const mysql = require('mysql');

const bookTemplate = new mysql.Schema({
    name:{
        type: String, 
        required: true 
    },
    age:{
        type: Number, 
        required: true
    },
    country:{
        type: String, 
        required: true
    },
    book: {
        type: String, 
        required: true
    },
    reservationFrom: {
        type: Number, 
        required: true
    },
    reservationTo: {
        type: Number, 
        required: true
    },

    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mysql.model('booksystem', bookTemplate);