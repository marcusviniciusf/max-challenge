import { useState, useEffect } from "react";
import { getMyLists, removeArtistFromList } from "services/storage";
// UI
import { Card, H2 } from "components";
// Types
import { ArtistResponse } from "types/api";

const MyListPage = () => {
  const [myList, setMyList] = useState<ArtistResponse[]>([]);
  useEffect(() => {
    const storageList = getMyLists();
    setMyList(storageList);
  }, []);

  const onRemove = (artist: ArtistResponse) => {
    const newList = removeArtistFromList(artist);
    setMyList(newList);
  };

  return (
    <section>
      {myList.length === 0 && (
        <H2 textAlign="center" my={3}>
          Empty List :/
        </H2>
      )}
      {myList.map((art) => (
        <Card key={art.id} onRemove={onRemove} artist={art} />
      ))}
    </section>
  );
};

export default MyListPage;
