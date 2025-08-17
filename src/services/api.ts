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



// Obtener personajes por página
export const fetchPaginas = async (page: number): Promise<ApiResponse> => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  if (!res.ok) throw new Error("Error en la llamada a la API");
  const data: ApiResponse = await res.json();
  return data;
};
