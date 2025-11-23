import { api } from "../api/apiClient";
import { useEffect, useState } from "react";
import type IShow from "../interfaces/IShow";

export const useGetSeries = (page?: number) => {
    const [data, setData] = useState<IShow[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = page !== undefined ? `/shows?page=${page}` : "/shows";
                const res = await api.get<IShow[]>(url);

                if (active) {
                    setData(res.data ?? []);
                    setLoading(false);
                }
            } catch (err: any) {
                if (active) {
                    setLoading(false);
                    setError(err?.message ?? "Unknown error");
                }
            }
        };

        fetchData();

        return () => {
            active = false;
        };
    }, [page]);

    return { data, loading, error };
};