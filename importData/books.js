import fetch from 'node-fetch';
import mongoose from 'mongoose';
import base64 from 'base-64';
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION);

const bookSchema = new mongoose.Schema({
  url: String,
  name: String,
  isbn: String,
  authors: [String],
  numberOfPages: Number,
  publisher: String,
  country: String,
  mediaType: String,
  released: Date,
  characters: [String],
  povCharacters: [String],
  bookCover: String
});

const Book = mongoose.model('Books', bookSchema);

async function getBooks(){
  
  const books = await fetch('https://anapioficeandfire.com/api/books/');
  const result = await books.json();
  
  for(let i = 0; i < result.length; i++) {
    const coverURL = `https://covers.openlibrary.org/b/isbn/${result[i]['isbn']}-L.jpg`;
    const coverBase64 = base64.encode(coverURL);

    const book = new Book({
      url: result[i]['url'],
      name: result[i]['name'],
      isbn: result[i]['isbn'],
      authors: result[i]['authors'],
      numberOfPages: result[i]['numberOfPages'],
      publisher: result[i]['publisher'],
      country: result[i]['country'],
      mediaType: result[i]['mediaType'],
      released: result[i]['released'],
      characters: result[i]['characters'],
      povCharacters: result[i]['povCharacters'],
      bookCover: coverBase64
    });    
        
    book.save();
  };
  return `Dados inseridos`
};

getBooks();
