import { useState } from "react";
import type { Character } from "../types/Character";
import { Container } from "semantic-ui-react";
import CharacterDetail from "./CharacterDetail";
import CharacterList from "./CharacterList";

function RickAndMorty() {
	const [personajeSeleccionado, setPersonajeSeleccionado] =
		useState<Character | null>(null);

	const handlePersonajeSeleccionado = (personaje: Character) => {
		setPersonajeSeleccionado(personaje);
	};

	const handleVolver = () => {
		setPersonajeSeleccionado(null);
	};

	return (
		<Container style={{ marginTop: "2em" }}>
			{personajeSeleccionado ? (
				<CharacterDetail
					onVolver={handleVolver}
					personaje={personajeSeleccionado}
				/>
			) : (
				<CharacterList onPersonajeSeleccionado={handlePersonajeSeleccionado} />
			)}
		</Container>
	);
}

export default RickAndMorty;
