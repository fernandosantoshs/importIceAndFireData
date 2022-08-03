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

const Character = mongoose.model("Characters", characterSchema);

async function getCharacters() {
  const characters = await fetch(
    "https://anapioficeandfire.com/api/characters"
  );
  const result = await characters.json();

  for (let i = 0; i < result.length; i++) {
    const character = new Character({
      url: result[i]["url"],
      name: result[i]["name"],
      gender: result[i]["gender"],
      culture: result[i]["culture"],
      born: result[i]["born"],
      died: result[i]["died"],
      titles: result[i]["titles"],
      aliases: result[i]["aliases"],
      father: result[i]["father"],
      mother: result[i]["mother"],
      spouse: result[i]["spouse"],
      allegiances: result[i]["allegiances"],
      books: result[i]["books"],
      povBooks: result[i]["povBooks"],
      tvSeries: result[i]["tvSeries"],
      playedBy: result[i]["playedBy"],
    });

    character.save();
  }

  return "Dados inseridos";
}

getCharacters();
