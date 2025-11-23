import type { FC } from "react";
import { useMemo } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { SeriesCard } from "./SeriesCard.tsx";
import { useGetSeries } from "../hooks/useGetSeries.ts";
import type IShow from "../interfaces/IShow.ts";
import useUIStore from "../stores/UIStore.ts";
import {useWatchlistStore} from "../stores/WatchlistStore.ts";

export const SeriesOverview: FC = () => {
    const { data, loading, error } = useGetSeries();
    const {
        searchQuery,
        genre,
        sort,
        onChangeQuery,
        onGenreChange,
        onSortChange,
        reset,
    } = useUIStore();
    const { toggle, isInWatchlist } = useWatchlistStore();

    const genres = useMemo(() => {
        const set = new Set<string>();
        (data ?? []).forEach((show: IShow) => {
            show.genres?.forEach((g) => set.add(g));
        });
        return ["All", ...Array.from(set).sort()];
    }, [data]);

    const filteredAndSorted = useMemo(() => {
        if (!data) return [];
        let result = [...data];

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter((show) =>
                show.name.toLowerCase().includes(query)
            );
        }

        if (genre !== "All") {
            result = result.filter((show) =>
                show.genres?.includes(genre)
            );
        }

        result.sort((a, b) => {
            switch (sort) {
                case "title":
                    return a.name.localeCompare(b.name);
                case "year": {
                    const yearA = a.premiered ? new Date(a.premiered).getFullYear() : 0;
                    const yearB = b.premiered ? new Date(b.premiered).getFullYear() : 0;
                    return yearA - yearB;
                }
                case "rating": {
                    const ratingA = a.rating?.average ?? 0;
                    const ratingB = b.rating?.average ?? 0;
                    return ratingB - ratingA;
                }
                default:
                    return 0;
            }
        });

        return result;
    }, [data, searchQuery, genre, sort]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Box
                m={3}
                display="flex"
                flexWrap="wrap"
                gap={2}
                alignItems="center"
                justifyContent="space-between"
            >
                <TextField
                    label="Search by title"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => onChangeQuery(e.target.value)}
                />

                <TextField
                    select
                    label="Genre"
                    variant="outlined"
                    size="small"
                    value={genre}
                    onChange={(e) => onGenreChange(e.target.value)}
                    sx={{ minWidth: 160 }}
                >
                    {genres.map((g) => (
                        <MenuItem key={g} value={g}>
                            {g}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Sort by"
                    variant="outlined"
                    size="small"
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="title">Title (A–Z)</MenuItem>
                    <MenuItem value="year">Year (ascending)</MenuItem>
                    <MenuItem value="rating">Rating (descending)</MenuItem>
                </TextField>

                <Button variant="outlined" onClick={reset}>
                    Reset
                </Button>
            </Box>

            {filteredAndSorted.length === 0 ? (
                <Typography variant="body1">
                    Keine Serien gefunden.
                </Typography>
            ) : (
                <Grid container spacing={2} marginX={2}>
                    {filteredAndSorted.map((show) => (
                        <Grid size={3} key={show.id}>
                            <SeriesCard
                                series={show}
                                inWatchlist={isInWatchlist(show.id)}
                                onToggleWatchlist={() => toggle(show.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};