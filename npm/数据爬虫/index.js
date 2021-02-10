const getMovies = require("./axios");
const fs = require("fs");

getMovies().then((movies) => {
  fs.writeFile("movies.json", JSON.stringify(movies), () => {
    console.log("over");
  });
});
