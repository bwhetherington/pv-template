import { createMuiTheme } from '@material-ui/core/styles';

const PRIMARY = '#b60b01';
const SECONDARY = '#ffaf15';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: SECONDARY
    }
  }
});
