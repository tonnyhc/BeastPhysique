export type Colors = {
  // text
  white: string;
  primaryText: string;
  secondaryText: string;
  thirtiaryText: string;
  helperText: string;
  blueText: string;
  // backgrounds
  bg: string;
  grayBg: string,
  submitBtn: string;
  inputBg: string;
  cardBg: string;
  iconColor: string
  error: string;
  // border
  borderGrey: string
};

export const lightColors: Colors = {
  // text
  white: "#FFF",
  primaryText: "#171A1FFF",
  secondaryText: "#9095A0FF",
  thirtiaryText: "#565E6CFF",
  helperText: "#6E7787FF",
  // blueText: "#00BDD6FF",
  blueText: '#4572E4',
  // backgrounds
  bg: "#FFFFFF",
  grayBg: "#DCDCDC",
  // submitBtn: "#00BDD6FF",
  submitBtn: '#4572E4',
  inputBg: "#F3F4F6FF",
  cardBg: "#FFFFFF",

  iconColor: 'black',

  error: "#C12025",
  // Borders
  borderGrey: "#CCC"
};

export const darkColors: Colors = {
  // text
  white: "#FFF",
  primaryText: "#FFFFFF",
  secondaryText: "#9095A0FF",
  thirtiaryText: "#FFFFFF",
  helperText: "#6E7787FF",
  // blueText: "#00BDD6FF",
  blueText: '#4572E4',
  // backgrounds
  bg: "#171A1FFF",
  grayBg: "#DCDCDC",
  inputBg: "#1D2128FF",
  // submitBtn: "#00BDD6FF",
  submitBtn: '#4572E4',
  cardBg: "#323842FF",

  iconColor: '#DEE1E6FF',
  error: "#C12025",

  // Borders
  borderGrey: "#CCC"
};
