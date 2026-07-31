import { createTheme, type MantineColorsTuple } from '@mantine/core';

const primary: MantineColorsTuple = [
  '#f0f7ff',
  '#e3effc',
  '#c7dff9',
  '#a8ccf5',
  '#88b8f0',
  '#6ba3e8',
  '#558fd9',
  '#4479c4',
  '#3564ad',
  '#2a5296',
];

const systemFontStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

export const theme = createTheme({
  primaryColor: 'primary',
  defaultRadius: 'sm',
  fontFamily: systemFontStack,
  colors: {
    primary,
  },
});
