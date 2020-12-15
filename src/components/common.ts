import styled, { css } from "styled-components";
import { flexbox, space, layout, position, color, compose } from "styled-system";
// Interfaces
import { BoxInterface } from "types/common";

const boxProps = compose(space, color, layout, flexbox, position);

export const Box = styled("div")<BoxInterface>(
  {
    boxSizing: "border-box",
  },
  boxProps
);

export const Flex = styled(Box)({
  display: "flex",
});

export const Container = styled.div(
  ({ theme }) => css`
    max-width: 992px;
    margin: 0 auto;
    padding: 0 2rem;
    ${theme.media.sm} {
      padding: 0 4rem;
    }
  `
);
