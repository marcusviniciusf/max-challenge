import { useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
// UI
import { Text, H2, Flex, Box, Button } from "components";
// Types
import { ArtistResponse } from "types/api";
// Services
import { getMyLists, addArtistToList, removeArtistFromList } from "services/storage";

const ArtistBox = styled.div(
  () => css`
    padding: 1.5rem;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.4);
    margin-bottom: 2rem;
    border-radius: 5px;
  `
);

const ArtistImage = styled.img(
  ({ theme }) => css`
    height: 10rem;
    width: 10rem;
    ${theme.media.md} {
      height: 20rem;
      width: 20rem;
    }
  `
);

const GenreArtistDetail = (props: ArtistResponse) => {
  const { genres, id, image, name, popularity } = props;
  const firstGenre = genres[0].name;
  const otherGenres = genres.slice(1).map((gr) => gr.name);

  const [myList, setMyList] = useState<ArtistResponse[]>([]);

  useEffect(() => {
    const listFromStorage = getMyLists();
    setMyList(listFromStorage);
  }, []);

  const artistIsOnList = useMemo(() => myList.find((ar) => ar.id === id), [myList, id]);

  const addRemoveArtist = () => {
    let newList = [];
    if (artistIsOnList) {
      newList = removeArtistFromList(props);
    } else {
      newList = addArtistToList(props);
    }
    setMyList(newList);
  };

  const btnColor = artistIsOnList ? "secondary" : "primary";

  return (
    <ArtistBox>
      <Flex mb={2}>
        <ArtistImage src={image} alt={`Artist__${name}img`} />
        <Flex flexDirection="column" ml={[1, 1, 3]}>
          <H2 fontWeight="bold">{name}</H2>
          <Text mt={[1, 1, 2]}>Primary Genre: {firstGenre}</Text>
          <Text mt={["5px", "5px", 1]}>Popularity Score: {popularity}</Text>
        </Flex>
      </Flex>
      <Flex>
        <Box flex={0.8}>
          <Text>Additional Genres:</Text>
          <Text>{otherGenres.join(", ")}</Text>
        </Box>
        <Flex flex={0.2}>
          <Button fullWidth color={btnColor} onClick={addRemoveArtist}>
            {!artistIsOnList ? "ADD" : "REMOVE"}
          </Button>
        </Flex>
      </Flex>
    </ArtistBox>
  );
};

export default GenreArtistDetail;
