// api.ts
import type { Character } from "../types/Character";

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const API_URL = "https://rickandmortyapi.com/api"; 


export const fetchPaginas = async (page: number): Promise<ApiResponse> => {
	try {
		const res = await fetch(`${API_URL}/character?page=${page}`);
		if (!res.ok) {
			throw new Error(
				`Error ${res.status}: No se pudo obtener la página ${page}`
			);
		}
		const data: ApiResponse = await res.json();
		return data;
	} catch (err) {
		throw new Error(`Error al obtener los personajes (página ${page}): ${err}`);
	}
};



