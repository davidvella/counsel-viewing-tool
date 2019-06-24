import { createMuiTheme } from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: grey[900]           
        }
    }
  });