import styled, { css } from "styled-components";
import {
  color,
  ColorProps,
  typography,
  TypographyProps,
  space,
  SpaceProps,
  compose,
} from "styled-system";

const textProps = compose(space, color, typography);

type TextProps = SpaceProps & TypographyProps & ColorProps;

export const Text = styled.p<TextProps>(
  ({ theme }) => css`
    font-size: ${theme.fontSizes[1]}px;
    font-weight: 400;
    ${textProps};
  `
);

export const SmallText = styled.span<TextProps>(
  ({ theme }) => css`
    font-size: ${theme.fontSizes[0]}px;
    font-weight: 400;
    ${textProps};
  `
);

export const H1 = styled.h1<TextProps>(
  ({ theme }) => css`
    font-size: ${theme.fontSizes[3]}px;
    font-weight: 500;
    ${textProps};
  `
);
export const H2 = styled.h2<TextProps>(
  ({ theme }) => css`
    font-size: ${theme.fontSizes[2]}px;
    font-weight: 400;
    ${textProps};
  `
);
