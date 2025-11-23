import {createTheme} from "@mui/material";
import {blue, common, lightBlue} from "@mui/material/colors";

export const Theme = createTheme({
    palette: {
        primary: {
            main: blue[800],
            contrastText: common.white
        },
        background: {
            default: common.white,
            paper: lightBlue[100]
        },
        text: {
            primary: common.black,
        }
    }
});