import { useState, useEffect } from "react";
// Services
import { genreSearch, genreArtistsSearch } from "services/api";
// Types
import { GenreResponse, ArtistResponse } from "types/api";
// View
import GenreListView from "./components/GenreList.view";

const GenreListPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchArtistsLoading, setArtistsLoading] = useState(false);

  const [searchFocused, setSearchFocused] = useState(false);

  const [searchResults, setSearchResults] = useState<GenreResponse[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponse>();
  const [artists, setArtirts] = useState<ArtistResponse[]>([]);

  const doSearch = async (value: string) => {
    try {
      setSearchLoading(true);
      const { data } = await genreSearch<GenreResponse[]>(value, 10);
      setSearchResults(data);
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
    }
  };

  const doSearchArtists = async (id: number) => {
    try {
      setArtistsLoading(true);
      const { data } = await genreArtistsSearch<ArtistResponse[]>(id);
      setArtirts(data);
      setArtistsLoading(false);
    } catch (error) {
      setArtistsLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      doSearch(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (selectedGenre?.id) {
      doSearchArtists(selectedGenre.id);
    }
  }, [selectedGenre]);

  const onSelect = (genre: GenreResponse) => {
    setSearchValue(genre.name);
    setSelectedGenre(genre);
    setSearchFocused(false);
  };

  return (
    <GenreListView
      artists={artists}
      onSelect={onSelect}
      searchResults={searchResults}
      searchFocused={searchFocused}
      searchValue={searchValue}
      searchLoading={searchLoading}
      setSearchFocused={setSearchFocused}
      setSearchValue={setSearchValue}
      searchArtistsLoading={searchArtistsLoading}
    />
  );
};

export default GenreListPage;
