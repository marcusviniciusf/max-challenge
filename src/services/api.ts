type ResponseAPI<T = {}> = {
  data: T;
};

const defaultFetch = async <T>(url: string): Promise<ResponseAPI<T>> => {
  const completeUrl = `${process.env.REACT_APP_API_URL}/api/v1/music${url}`;
  return await fetch(completeUrl, {
    headers: {
      Authorization: `apikey ${process.env.REACT_APP_API_TOKEN}`,
    },
  }).then((r) => r.json());
};

const genreSearch = <T = {}>(q: string, limit = 20) => {
  return defaultFetch<T>(`/genres?q=${q}&limit=${limit}`);
};
const genreArtistsSearch = <T = {}>(idArtist: number) => {
  return defaultFetch<T>(`/genres/${idArtist}/artists`);
};
const artist = <T = {}>(idArtist: string) => {
  return defaultFetch<T>(`/artists/${idArtist}`);
};
const artistSimilars = <T = {}>(idArtist: string) => {
  return defaultFetch<T>(`/artists/${idArtist}/similar`);
};

export { genreSearch, genreArtistsSearch, artistSimilars, artist };
