import styled, { css } from "styled-components";

type ButtonProps = {
  color?: "primary" | "secondary";
  fullWidth?: boolean;
};

export const Button = styled.a<ButtonProps>(
  ({ theme, color, fullWidth }) => css`
    padding: 1rem;
    font-size: 1.6rem;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    width: ${fullWidth ? "100%" : "initial"};
    ${color === "primary"
      ? css`
          background-color: ${theme.colors.teal};
          &:hover {
            background-color: ${theme.colors.tealStrong};
          }
        `
      : css`
          background-color: ${theme.colors.red};
          &:hover {
            background-color: ${theme.colors.redLight};
          }
        `};
  `
);

Button.defaultProps = {
  color: "primary",
};
