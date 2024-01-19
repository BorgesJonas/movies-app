import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BookmarkSimple,
  CalendarBlank,
  CaretLeft,
  Clock,
  Star,
} from "phosphor-react-native";

import { api } from "../../services/api";

import { styles } from "./styles";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type RouterProps = {
  movieId: number;
};

function getYear(date: string) {
  return new Date(date).getFullYear();
}

export function Details() {
  const route = useRoute();
  const navigation = useNavigation();
  const { movieId } = route.params as RouterProps;
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  async function fetchMovieDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/movie/${movieId}`);
      setMovieDetails(response.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={50} color="#fff" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CaretLeft color="#fff" size={32} weight="thin" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Detalhes</Text>
            <TouchableOpacity>
              <BookmarkSimple color="#fff" size={32} weight="thin" />
            </TouchableOpacity>
          </View>

          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
              }}
              style={styles.detailsImage}
            />
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
              }}
              style={styles.detailsPosterImage}
            />

            <Text style={styles.title}>{movieDetails?.title}</Text>
            <View style={styles.description}>
              <View style={styles.descriptionGroup}>
                <CalendarBlank color="#92929d" size={25} weight="thin" />
                <Text style={styles.descriptionText}>
                  {getYear(movieDetails?.release_date)}
                </Text>
              </View>

              <View style={styles.descriptionGroup}>
                <Clock color="#92929d" size={25} weight="thin" />
                <Text
                  style={styles.descriptionText}
                >{`${movieDetails?.runtime} minutos`}</Text>
              </View>

              <View style={styles.descriptionGroup}>
                <Star
                  color={
                    movieDetails?.vote_average.toFixed(2) >= "7"
                      ? "#ff8700"
                      : "#92929d"
                  }
                  size={25}
                  weight={
                    movieDetails?.vote_average.toFixed(2) >= "7"
                      ? "duotone"
                      : "thin"
                  }
                />
                <Text
                  style={
                    movieDetails?.vote_average.toFixed(2) >= "7"
                      ? styles.descriptionText1
                      : styles.descriptionText
                  }
                >
                  {movieDetails?.vote_average.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.about}>
            <Text style={styles.aboutText}>Sinopse:</Text>
            <Text style={styles.aboutText}>
              {movieDetails?.overview
                ? movieDetails?.overview
                : "Ops! Parece que esse filme ainda não tem sinopse"}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
