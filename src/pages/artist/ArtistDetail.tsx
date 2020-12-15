import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
// Types
import { ArtistResponse } from "types/api";
// Services
import { artistSimilars, artist } from "services/api";
// UI
import { Card, Text, Loading } from "components";
// Component
import GenreArtistDetail from "./components/ArtistsCard";

const ArtistContainer = styled.div(
  ({ theme }) => css`
    margin: 0;
    ${theme.media.md} {
    }
    ${theme.media.md} {
      margin: 0 10rem;
    }
  `
);

type ArtistParams = {
  id: string;
};

const ArtistPage = () => {
  const params = useParams<ArtistParams>();
  const history = useHistory();
  const [artistDetail, setArtist] = useState<ArtistResponse>();
  const [similarArtists, setSimilarArtists] = useState<ArtistResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const doFetchArtist = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const { data } = await artist<ArtistResponse[]>(id);
        setArtist(data[0]);
        const responseSimilar = await artistSimilars<ArtistResponse[]>(id);
        setSimilarArtists(responseSimilar.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        history.push("/");
      }
    },
    [history]
  );

  useEffect(() => {
    if (params.id) {
      doFetchArtist(params.id);
    } else {
      history.push("/");
    }
  }, [params.id, doFetchArtist, history]);
  if (loading) {
    return <Loading show />;
  }
  return (
    <section>
      <ArtistContainer>{artistDetail && <GenreArtistDetail {...artistDetail} />}</ArtistContainer>
      {similarArtists.length > 0 && (
        <>
          <Text fontWeight="500" my={3}>
            Related Artists:
          </Text>
          <ArtistContainer>
            {similarArtists.map((art) => (
              <Card key={art.id} artist={art} />
            ))}
          </ArtistContainer>
        </>
      )}
    </section>
  );
};

export default ArtistPage;
