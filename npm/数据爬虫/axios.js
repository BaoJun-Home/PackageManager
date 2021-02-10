const axios = require("axios");
const cheerioModule = require("cheerio");
const cheerio = require("cheerio");

/**
 * 获取所有电影的字符串
 */
async function getMoviesHtml() {
  const resp = await axios.get("https://movie.douban.com/chart");
  return resp.data;
}

/**
 * 获取所有电影对象
 */
async function getMovies() {
  const html = await getMoviesHtml();
  const $ = cheerio.load(html);
  const trs = $("tr.item");
  const movies = [];
  for (let i = 0; i < trs.length; i++) {
    const movie = trs[i]; // 每个电影对象
    const m = getMovie($(movie));
    movies.push(m);
  }
  return movies;
}

/**
 * 分析每个电影
 * @param {*} movie
 */
function getMovie(movie) {
  let name = movie.find("div.pl2 a").text();
  name = name.replace(/\s/g, "");
  name = name.split("/")[0];

  let src = movie.find("tr.item a.nbg img").attr("src");

  let text = movie.find("div.pl2 p.pl").text();

  return {
    name,
    src,
    text,
  };
}

module.exports = getMovies;
