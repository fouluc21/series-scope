import type { FC } from "react";
import { useMemo } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";
import { useGetSeries } from "../hooks/useGetSeries.ts";
import { SeriesCard } from "./SeriesCard.tsx";
import { useWatchlistStore } from "../stores/WatchlistStore.ts";
import type IShow from "../interfaces/IShow.ts";

export const Watchlist: FC = () => {
    const { data, loading, error } = useGetSeries();
    const { ids, toggle, clear } = useWatchlistStore();

    const showsOnWatchlist = useMemo(
        () => (data ?? []).filter((show: IShow) => ids.includes(show.id)),
        [data, ids]
    );

    const stats = useMemo(() => {
        const count = showsOnWatchlist.length;
        if (count === 0) {
            return {
                count: 0,
                avgRating: null,
                oldestYear: null,
                youngestYear: null,
            };
        }
        const ratings = showsOnWatchlist
            .map((s) => s.rating?.average)
            .filter((v): v is number => v != null);

        const avgRating =
            ratings.length > 0
                ? ratings.reduce((sum, v) => sum + v, 0) / ratings.length
                : null;

        const years = showsOnWatchlist
            .map((s) =>
                s.premiered ? new Date(s.premiered).getFullYear() : null
            )
            .filter((v): v is number => v != null);

        const oldestYear = years.length ? Math.min(...years) : null;
        const youngestYear = years.length ? Math.max(...years) : null;

        return { count, avgRating, oldestYear, youngestYear };
    }, [showsOnWatchlist]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" m={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box m={4}>
                <Typography>{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Button
                variant="outlined"
                onClick={() => clear()}
                disabled={showsOnWatchlist.length === 0}
                sx={{ margin: 2 }}
            >
                Clear Watchlist
            </Button>

            <Box m={3}>
                <Typography>Anzahl Serien: {stats.count}</Typography>
                <Typography>
                    Durchschnittsrating:{" "}
                    {stats.avgRating != null
                        ? stats.avgRating.toFixed(2)
                        : "-"}
                </Typography>
                <Typography>
                    Ältester Jahrgang:{" "}
                    {stats.oldestYear != null ? stats.oldestYear : "-"}
                </Typography>
                <Typography>
                    Jüngster Jahrgang:{" "}
                    {stats.youngestYear != null ? stats.youngestYear : "-"}
                </Typography>
            </Box>

            {showsOnWatchlist.length === 0 ? (
                <Typography variant="body1">
                    Deine Watchlist ist leer.
                </Typography>
            ) : (
                <Grid container spacing={2} mx={2}>
                    {showsOnWatchlist.map((show) => (
                        <Grid size={3} key={show.id}>
                            <SeriesCard
                                series={show}
                                inWatchlist={true}
                                onToggleWatchlist={() => toggle(show.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};