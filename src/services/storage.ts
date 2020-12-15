import { ArtistResponse } from "types/api";

const KEYS = {
  MY_LIST: "@max_mylist",
};

const getMyLists = (): ArtistResponse[] => {
  const result = localStorage.getItem(KEYS.MY_LIST);

  return result ? JSON.parse(result) : [];
};

const addArtistToList = (artist: ArtistResponse): ArtistResponse[] => {
  let myCurrentList = getMyLists();
  myCurrentList = [...myCurrentList, artist];
  localStorage.setItem(KEYS.MY_LIST, JSON.stringify(myCurrentList));
  return myCurrentList;
};

const removeArtistFromList = (artist: ArtistResponse): ArtistResponse[] => {
  let myCurrentList = getMyLists();
  myCurrentList = myCurrentList.filter((art) => art.id !== artist.id);
  localStorage.setItem(KEYS.MY_LIST, JSON.stringify(myCurrentList));
  return myCurrentList;
};

export { getMyLists, addArtistToList, removeArtistFromList };
