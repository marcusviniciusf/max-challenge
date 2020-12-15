import { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
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
  ({ theme }) => css`
    height: 9rem;
    width: 9rem;
    margin-right: 1rem;
    ${theme.media.md} {
      margin-right: 2rem;
    }
  `
);

interface CardProps {
  artist: ArtistResponse;
  onRemove?(artist: ArtistResponse): void;
}

export const Card = (props: CardProps) => {
  const history = useHistory();
  const { artist, onRemove } = props;
  const { name, genres, id, image } = artist;
  const firstGenreName = genres[0].name || "";

  const [myList, setMyList] = useState<ArtistResponse[]>([]);

  useEffect(() => {
    if (!onRemove) {
      const listFromStorage = getMyLists();
      setMyList(listFromStorage);
    }
  }, [onRemove]);

  const artistIsOnList = useMemo(() => myList.find((ar) => ar.id === id), [myList, id]);

  const addRemoveArtist = () => {
    let newList = [];
    if (!onRemove) {
      if (artistIsOnList) {
        newList = removeArtistFromList(artist);
      } else {
        newList = addArtistToList(artist);
      }
      setMyList(newList);
    } else {
      onRemove(artist);
    }
  };

  const btnColor = artistIsOnList || onRemove ? "secondary" : "primary";

  return (
    <CardBox
      onClick={() => {
        history.push(`/${id}`);
      }}
    >
      <CardImage alt={`Artists__${name}`} src={image} />
      <Flex flex={1} flexDirection={["column", "column", "row"]}>
        <Flex flex={0.8} flexDirection="column" alignItems="center" justifyContent="center">
          <Text mb={"5px"} fontWeight="bold">
            {name}
          </Text>
          <SmallText>{firstGenreName}</SmallText>
        </Flex>
        <Flex flex={0.2} alignItems="center" justifyContent="center">
          <Button
            fullWidth
            color={btnColor}
            onClick={(e) => {
              e.stopPropagation();
              addRemoveArtist();
            }}
          >
            {!artistIsOnList && !onRemove ? "ADD" : "REMOVE"}
          </Button>
        </Flex>
      </Flex>
    </CardBox>
  );
};
