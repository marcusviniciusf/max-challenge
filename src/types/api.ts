export type GenreResponse = {
  id: number;
  parent_id: number;
  name: string;
};

export type ArtistResponse = {
  id: number;
  popularity: number;
  name: string;
  image: string;
  genres: {
    id: number;
    is_primary: number;
    name: string;
  }[];
};
