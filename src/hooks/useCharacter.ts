import { useEffect, useState } from "react";
import type { Character } from "../types/Character";
import { fetchPaginas } from "../services/api";

export const useCharacter = () => {
	const [personajes, setPersonajes] = useState<Character[]>([]);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controlador = new AbortController();

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await fetchPaginas(page);
				setPersonajes(data.results);
				setTotalPages(data.info.pages);
			} catch (err: any) {
				if (err.name !== "AbortError") {
					setError(err.message || "Error desconocido");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		return () => controlador.abort();
	}, [page]);

	return {
		personajes,
		page,
		setPage,
		totalPages,
		loading,
		error,
	};
};
