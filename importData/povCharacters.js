import fetch from "node-fetch";
import mongoose from "mongoose";
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION);

const characterSchema = new mongoose.Schema({
  url: String,
  name: String,
  gender: String,
  culture: String,
  born: String,
  died: String,
  titles: [String],
  aliases: [String],
  father: String,
  mother: String,
  spouse: String,
  allegiances: [String],
  books: [String],
  povBooks: [String],
  tvSeries: [String],
  playedBy: [String],
});

const PovCharacter = mongoose.model("PovCharacters", characterSchema);

// Trazer as informações de todos os livros, depois acessar o array povCharacters[]
async function getPovCharacters() {
  try {
    const books = await fetch("https://anapioficeandfire.com/api/books/");

    const jsonBooks = await books.json();

    for (let i = 0; i < jsonBooks.length; i++) {
      const linkArray = jsonBooks[i]["povCharacters"];

      for (let link = 0; link < linkArray.length; link++) {
        const fetchCharacter = await fetch(linkArray[link]);

        const result = await fetchCharacter.json();

        const povCharacter = new PovCharacter({
          url: result["url"],
          name: result["name"],
          gender: result["gender"],
          culture: result["culture"],
          born: result["born"],
          died: result["died"],
          titles: result["titles"],
          aliases: result["aliases"],
          father: result["father"],
          mother: result["mother"],
          spouse: result["spouse"],
          allegiances: result["allegiances"],
          books: result["books"],
          povBooks: result["povBooks"],
          tvSeries: result["tvSeries"],
          playedBy: result["playedBy"],
        });

        povCharacter.save();
      }
    }
  } catch (err) {
    return `Erro: ${err}`;
  }

  return "Dados inseridos";
}

getPovCharacters();
