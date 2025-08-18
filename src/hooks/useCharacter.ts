import { useEffect, useState } from "react";
import type { Character } from "../types/Character";
import { fetchPaginas } from "../services/api";

export const useCharacter = () => {
	const [todos, setTodos] = useState<Character[]>([]);
	const [personajes, setPersonajes] = useState<Character[]>([]);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [busqueda, setBusqueda] = useState("");
	const porPagina = 20;

	// 🔁 Fetch de todos los personajes al inicio
	useEffect(() => {
		const fetchAll = async () => {
			setLoading(true);
			try {
				const primeraPagina = await fetchPaginas(1);
				const paginasTotales = primeraPagina.info.pages;

				const peticiones = [];
				for (let i = 2; i <= paginasTotales; i++) {
					peticiones.push(fetchPaginas(i));
				}

				const resultados = await Promise.all(peticiones);
				const personajesTotales = [
					...primeraPagina.results,
					...resultados.flatMap((p) => p.results),
				];

				setTodos(personajesTotales);
				setError(null);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Error desconocido");
				}
				setTodos([]);
			} finally {
				setLoading(false);
			}
		};

		fetchAll();
	}, []);

	// 🔎 Lógica de búsqueda local sobre los datos ya cargados
	useEffect(() => {
		const filtro = busqueda.toLowerCase().trim();

		if (filtro === "") {
			const inicio = (page - 1) * porPagina;
			const fin = inicio + porPagina;
			setPersonajes(todos.slice(inicio, fin));
			setTotalPages(Math.ceil(todos.length / porPagina));
		} else {
			const filtrados = todos.filter(
				(personaje) =>
					personaje.name.toLowerCase().includes(filtro) ||
					personaje.id.toString() === filtro
			);

			setPersonajes(filtrados);
			setTotalPages(1); // solo una página de resultados de búsqueda
		}
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
