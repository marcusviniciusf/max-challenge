import { DefaultTheme } from "styled-components";

export enum colors {
  primary = "#635f60",
  secondary = "#343434",
  greyLight = "#e3dedf",
  white = "#fff",
  teal = "rgb(26,126,152)",
  tealStrong = "rgb(17,82,99)",
  red = "#d50000",
  redLight = "#e53935",
}

type BpKeys = keyof typeof breakpoints;

export enum breakpoints {
  xs = "36em", // 576px
  sm = "48em", // 768px
  md = "62em", // 992px
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof colors;
    fontSizes: number[];
    space: number[];
    breakpoints: string[];
    media: typeof breakpoints;
  }
}

const media = (Object.keys(breakpoints) as Array<BpKeys>).reduce((acc: any, cur) => {
  const currBreakpoint = breakpoints[cur];
  acc[cur] = `@media (min-width: ${currBreakpoint})`;
  return acc;
}, {});

export const theme: DefaultTheme = {
  colors,
  space: [0, 10, 20, 30, 40, 60],
  breakpoints: Object.values(breakpoints),
  fontSizes: [14, 16, 20, 28],
  media,
};
