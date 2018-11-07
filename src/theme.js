import { createMuiTheme } from '@material-ui/core/styles';

/**
 * PRIMARY is Venetian red
 * SECONDARY is Venetian Gold
 */
const PRIMARY = '#b60b01';
const SECONDARY = '#ffaf15';

export const theme = createMuiTheme({
  palette: {
    type: 'light'
  },
  typography: {
    title: {
      fontFamily: '"Roboto Slab", serif'
    },
    headline: {
      fontFamily: '"Roboto Slab", serif'
    }
  },
  //   text: {
  //     primary: 'rgba(255, 255, 255, 0.87)',
  //     secondary: 'rgba(255, 255, 255, 0.54)',
  //     disabled: 'rgba(255, 255, 255, 0.38)',
  //     hint: 'rgba(255, 255, 255, 0.38)'
  //   }

  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: SECONDARY
    }
  }
});
