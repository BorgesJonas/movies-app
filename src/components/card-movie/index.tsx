import { Image, Pressable } from "react-native";

import { styles } from "./styles";

interface Movie {
  id: number;
  poster_path: string;
}

interface Props {
  data: Movie;
  onPress?: () => void;
}

export function CardMovie({ data, ...props }: Props) {
  return (
    <Pressable {...props} style={styles.cardMovie}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
        style={styles.cardImage}
      />
    </Pressable>
  );
}
