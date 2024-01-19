import axios from "axios";
import { API_KEY } from "@env";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: `${API_KEY}`,
    language: "pt-BR",
    include_adult: false,
  },
});
