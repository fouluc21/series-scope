import type {FC} from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import useLanguageStore from "../stores/LanguageStore.ts";

export const Header: FC = () => {
    const navigate = useNavigate();
    const language = useLanguageStore();

    return (
        <AppBar position="sticky">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography variant="body1" component="h1">
                    Serien-Scope
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate("/series")}
                    >
                        {language.language == "de" ? "Serien" : "Series"}
                    </Button>

                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate("/watchlist")}
                    >
                        {language.language == "de" ? "Favoriten" : "Watchlist"}
                    </Button>

                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => language.toggleLanguage()}
                    >
                        {language.language.toUpperCase()}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}