const theme = {
  palette: {
    primary: {
      light: '#009845',
      main: '#009845',
      dark: '#009845',
      contrastText: '#fff',
    },
    secondary: {
      light: '#870064',
      main: '#870064',
      dark: '#870064',
      contrastText: '#fff',
    },
    success: {
      light: '#009845',
      main: '#009845',
      dark: '#009845',
      contrastText: '#fff',
    },
    info: { // SAPPHIRE
      light: '#005CB9',
      main: '#005CB9',
      dark: '#005CB9',
      contrastText: '#fff',
    },
  },
  shape: {
    borderRadius: 0,
  },
  // status: {
  //   danger: 'orange',
  // },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        borderRadius: 3,
        borderColor: '#FFFFFF',
        border: 5,
      },
    },
  },
};

export default theme;
