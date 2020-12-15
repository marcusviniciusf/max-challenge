import styled, { css } from "styled-components";
import { Text, H1 } from "./typography";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

const HeaderButtonBack = styled.a(
  ({ theme }) => css`
    padding: 1rem;
    background-color: ${theme.colors.teal};
    color: white;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
    &:hover {
      background-color: ${theme.colors.tealStrong};
    }
  `
);

const HeaderTitle = styled(H1)``;

const HeaderButtonLink = styled(Link)`
  margin-left: auto;
  text-decoration: none;
  border-bottom: 1px solid;
`;

const HeaderStyled = styled.header(
  () => css`
    position: relative;
    padding: 3rem 0;
    display: flex;
    align-items: center;
    height: 10rem;
  `
);

export const Header = () => {
  const history = useHistory();
  const match = !!useRouteMatch(["/:id", "/mylist"]);
  const isMyListPage = !!useRouteMatch("/mylist");
  return (
    <HeaderStyled>
      {match && (
        <HeaderButtonBack onClick={() => history.push("/")}>
          <Text>Back to Search</Text>
        </HeaderButtonBack>
      )}
      {isMyListPage ? (
        <HeaderTitle ml="auto">My List</HeaderTitle>
      ) : (
        <HeaderButtonLink to="/mylist">
          <Text>View My Lists</Text>
        </HeaderButtonLink>
      )}
    </HeaderStyled>
  );
};
