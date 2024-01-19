import axios from "axios";

// https://api.themoviedb.org/3/movie/157336?api_key=1f80903178546cd1ae37d7bd981ee3b3
// https://api.themoviedb.org/3/movie/157336/videos?api_key=1f80903178546cd1ae37d7bd981ee3b3

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "1f80903178546cd1ae37d7bd981ee3b3",
    language: "pt-BR",
    include_adult: false,
  },
});
