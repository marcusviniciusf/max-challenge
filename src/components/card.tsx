import { useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
// Types
import { ArtistResponse } from "types/api";
// UI
import { Flex } from "./common";
import { Text, SmallText } from "./typography";
import { Button } from "./button";
// Services
import { getMyLists, addArtistToList, removeArtistFromList } from "services/storage";

const CardBox = styled.div(
  () => css`
    border-radius: 5px;
    height: 12rem;
    display: flex;
    padding: 1.5rem;
    padding-right: 2rem;
    margin-bottom: 2rem;
    transition: box-shadow 0.2s ease-in;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    &:hover {
      box-shadow: 0 0px 7px 3px rgba(0, 0, 0, 0.4);
    }
  `
);
const CardImage = styled.img(
  () => css`
    height: 9rem;
    width: 9rem;
    margin-right: 2rem;
  `
);

interface CardProps {
  artist: ArtistResponse;
  controlled: boolean;
}

export const Card = (props: CardProps) => {
  const { artist, controlled } = props;
  const { name, genres, id, image } = artist;
  const firstGenreName = genres[0].name || "";

  const [myList, setMyList] = useState<ArtistResponse[]>([]);

  useEffect(() => {
    if (!controlled) {
      const listFromStorage = getMyLists();
      setMyList(listFromStorage);
    }
  }, [controlled]);

  const artistIsOnList = useMemo(() => myList.find((ar) => ar.id === id), [myList, id]);

  const addRemoveArtist = () => {
    let newList = [];
    if (artistIsOnList) {
      newList = removeArtistFromList(artist);
    } else {
      newList = addArtistToList(artist);
    }
    setMyList(newList);
  };

  return (
    <CardBox>
      <CardImage alt={`Artists__${name}`} src={image} />
      <Flex flex={0.8} flexDirection="column" alignItems="center" justifyContent="center">
        <Text mb={"5px"} fontWeight="bold">
          {name}
        </Text>
        <SmallText>{firstGenreName}</SmallText>
      </Flex>
      <Flex flex={0.2} alignItems="center" justifyContent="center">
        <Button fullWidth color={"secondary"} onClick={addRemoveArtist}>
          {!artistIsOnList && !controlled ? "ADD" : "REMOVE"}
        </Button>
      </Flex>
    </CardBox>
  );
};

Card.defaultProps = {
  controlled: false,
};
