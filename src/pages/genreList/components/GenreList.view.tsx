import { useMemo } from "react";
import { H2, Card, Text, Loading } from "components";
// Styles
import {
  SearchInput,
  SearchInputWrapper,
  SearchResultListItem,
  SearchResultsList,
  SearchOverlay,
} from "./GenreList.styles";
// Types
import { ArtistResponse, GenreResponse } from "types/api";

type GenreListViewProps = {
  searchFocused: boolean;
  setSearchFocused(flag: boolean): void;
  searchValue: string;
  setSearchValue(value: string): void;
  searchArtistsLoading: boolean;
  searchLoading: boolean;
  artists: ArtistResponse[];
  searchResults: GenreResponse[];
  onSelect(genre: GenreResponse): void;
};

const GenreListView = (props: GenreListViewProps) => {
  const {
    searchLoading,
    searchFocused,
    searchValue,
    setSearchFocused,
    setSearchValue,
    searchResults,
    onSelect,
    artists,
    searchArtistsLoading,
  } = props;
  console.log("searchArtistsLoading: ", searchArtistsLoading);

  const isListOpen = useMemo(() => {
    return (searchFocused && searchResults.length > 0) || searchLoading;
  }, [searchFocused, searchLoading, searchResults]);

  const renderSearchContent = useMemo(() => {
    if (searchLoading) {
      return (
        <SearchResultListItem>
          <Text fontWeight="bold">Loading...</Text>
        </SearchResultListItem>
      );
    }
    return searchResults.map((res) => (
      <SearchResultListItem key={res.id} onClick={() => onSelect(res)}>
        {res.name}
      </SearchResultListItem>
    ));
  }, [searchLoading, searchResults, onSelect]);

  return (
    <section>
      <H2 mb={1}>Enter a genre to find artists:</H2>
      {searchFocused && <SearchOverlay onClick={() => setSearchFocused(false)} />}
      <SearchInputWrapper onFocus={() => setSearchFocused(true)}>
        <SearchInput
          type="text"
          placeholder="Type a genre"
          value={searchValue}
          isOpen={isListOpen}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {isListOpen && <SearchResultsList>{renderSearchContent}</SearchResultsList>}
      </SearchInputWrapper>
      {artists.length > 0 && artists.map((art) => <Card artist={art} key={art.id} />)}
      <Loading show={searchArtistsLoading} />
    </section>
  );
};

export default GenreListView;
