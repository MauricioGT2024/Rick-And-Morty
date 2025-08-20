import { useEffect, useState } from "react";
import type { Character } from "../types/Character";
import { fetchPaginas } from "../services/api";

	const POR_PAGINA = 20;

	export const useCharacter = () => {
		const [todos, setTodos] = useState<Character[]>([]);
		const [personajes, setPersonajes] = useState<Character[]>([]);
		const [page, setPage] = useState<number>(1);
		const [totalPages, setTotalPages] = useState<number>(1);
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState<string | null>(null);
		const [busqueda, setBusqueda] = useState("");

		// 🔁 Fetch de todos los personajes al inicio
		useEffect(() => {
			const fetchData = async () => {
				setLoading(true);
				try {
					const primeraPagina = await fetchPaginas(1);
					const paginasTotales = primeraPagina.info.pages;

					const resultados = await Promise.all(
						Array.from({ length: paginasTotales - 1 }, (_, i) =>
							fetchPaginas(i + 2)
						)
					);
					const personajesTotales = [
						...primeraPagina.results,
						...resultados.flatMap((p) => p.results),
					];

					setTodos(personajesTotales);
					setError(null);
				} catch (err) {
					const mensaje =
						err instanceof Error
							? err.message
							: "Error desconocido al cargar personajes";
					setError(mensaje);
					setTodos([]);
				} finally {
					setLoading(false);
				}
			};

			fetchData();
		}, []);

		// 🔎 Lógica de búsqueda local sobre los datos ya cargados
		useEffect(() => {
			const filtro = busqueda.toLowerCase().trim();

			const personajesFiltrados = filtro
				? todos.filter(
						(p) =>
							p.name.toLowerCase().includes(filtro) ||
							p.id.toString() === filtro
				  )
				: todos;

			const paginados = filtro
				? personajesFiltrados
				: personajesFiltrados.slice((page - 1) * POR_PAGINA, page * POR_PAGINA);

			setPersonajes(paginados)
			setTotalPages(
				filtro ? 1 : Math.ceil(personajesFiltrados.length / POR_PAGINA)
			)
		}, [todos, page, busqueda]);

		return {
			personajes,
			page,
			setPage,
			totalPages,
			loading,
			error,
			busqueda,
			setBusqueda,
		};
	};
