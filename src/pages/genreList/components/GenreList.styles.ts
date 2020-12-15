import styled, { css } from "styled-components";

type CommonInputProps = {
  isOpen: boolean;
};

export const SearchOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const SearchInputWrapper = styled.div(
  ({ theme }) => css`
    margin: 1rem 0;
    margin-bottom: 3rem;
    position: relative;
    width: 100%;
    ${theme.media.md} {
      width: 40%;
    }
  `
);

export const SearchResultsList = styled.ul(
  ({ theme }) => css`
    position: absolute;
    top: 100%;
    width: 100%;
    border: 1px solid;
    z-index: 2;
    background-color: ${theme.colors.white};
  `
);

export const SearchResultListItem = styled.li(
  ({ theme }) => css`
    padding: 1rem;
    font-size: 1.4rem;
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.greyLight};
    }
  `
);

export const SearchInput = styled.input<CommonInputProps>(
  ({ isOpen }) => css`
    width: 100%;
    padding: 1rem;
    border: 1px solid;
    border-radius: 5px;
    font-size: 1.6rem;
    &:focus {
      box-shadow: 0 3px 3px rgba();
      outline: none;
    }
    ${isOpen &&
    css`
      border-bottom-color: transparent;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    `}
  `
);
