import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MagnifyingGlass } from "phosphor-react-native";
import { api } from "../../services/api";
import { CardMovie } from "../../components/card-movie";

import { styles } from "./styles";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export function Home() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [noResult, setNoResult] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

  function renderItem({ item }: { item: Movie }) {
    return (
      <CardMovie
        data={item}
        onPress={() => navigation.navigate("Details", { movieId: item.id })}
      />
    );
  }

  async function searchMovies(query: string) {
    setLoading(true);

    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });

    if (response.data.results.length === 0) {
      setNoResult(true);
    } else {
      setSearchResultMovies(response.data.results);
      setNoResult(false);
    }

    setLoading(false);
  }

  function handleSearch(text: string) {
    setSearch(text);

    if (text.length > 2) {
      searchMovies(text);
    } else {
      setSearchResultMovies([]);
    }
  }

  async function loadData() {
    setLoading(true);
    const response = await api.get("/movie/popular", {
      params: {
        page,
      },
    });
    setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>O que você quer assistir hoje?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#FFF"
            placeholder="Buscar"
            style={styles.input}
            onChangeText={handleSearch}
            value={search}
          />
          <MagnifyingGlass color="#FFF" size={25} weight="light" />
        </View>

        {noResult && (
          <Text style={styles.noResult}>
            Nenhum filme encontrado para "{search}"
          </Text>
        )}
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={movieData}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 35, paddingBottom: 100 }}
          onEndReached={() => loadData()}
          onEndReachedThreshold={0.5}
          renderItem={renderItem}
        />
        {isLoading && <ActivityIndicator size={50} color="#0296E5" />}
      </View>
    </View>
  );
}
