import type { FC } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Button,
    Box,
} from "@mui/material";
import type IShow from "../interfaces/IShow.ts";

type SeriesCardProps = {
    series: IShow;
    inWatchlist: boolean;
    onToggleWatchlist: () => void;
};

export const SeriesCard: FC<SeriesCardProps> = ({
                                                    series,
                                                    inWatchlist,
                                                    onToggleWatchlist,
                                                }) => {
    const year = series.premiered
        ? new Date(series.premiered).getFullYear()
        : undefined;

    return (
        <Card>
            {series.image && (
                <CardMedia
                    component="img"
                    height="250"
                    image={series.image.original}
                    alt={series.name}
                />
            )}

            <CardContent>
                <Typography variant="h6" gutterBottom noWrap>
                    {series.name}
                </Typography>

                <Box display="flex" justifyContent="space-between" mb={1}>
                    {year && (
                        <Typography variant="body2" color="text.secondary">
                            {year}
                        </Typography>
                    )}

                    {series.rating !== undefined && (
                        <Chip label={`Rating: ${series.rating.average}`} size="small" />
                    )}
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {series.genres}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={onToggleWatchlist}
                >
                    {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>
            </CardActions>
        </Card>
    );
};