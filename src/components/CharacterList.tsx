import {
	Grid,
	Card,
	Image,
	Input,
	Button,
	Header,
	Loader,
} from "semantic-ui-react";
import type { Character } from "../types/Character";
import { useCharacter } from "../hooks/useCharacter";

interface Props {
	onPersonajeSeleccionado: (personaje: Character) => void;
}



const CharacterList: React.FC<Props> = ({ onPersonajeSeleccionado }) => {
	const {
		personajes,
		loading,
		error,
		page,
		setPage,
		totalPages,
		busqueda,
		setBusqueda,
	} = useCharacter();

	const handleBusqueda = (value: string) => {
		setBusqueda(value);
		setPage(1);
	};

	const renderBusquedaInput = () => (
		<form onSubmit={(e) => e.preventDefault()}>
			<Input
				fluid
				icon="search"
				placeholder="Buscar por Nombre o ID..."
				value={busqueda}
				onChange={(e) => handleBusqueda(e.target.value)}
				style={{
					marginBottom: "2rem",
					backgroundColor: "#f9f9f9",
					borderRadius: "10px",
					boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
				}}
			/>
		</form>
	);

	const renderPersonajeCard = (personaje: Character) => (
		<Grid.Column key={personaje.id}>
			<Card
				link
				style={{
					boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
					transition: "transform 0.2s ease",
				}}
				onClick={() => onPersonajeSeleccionado(personaje)}
				onMouseEnter={(e: { currentTarget: { style: { transform: string; }; }; }) => {
					e.currentTarget.style.transform = "scale(1.05)";
				}}
				onMouseLeave={(e: { currentTarget: { style: { transform: string; }; }; }) => {
					e.currentTarget.style.transform = "scale(1)";
				}}
			>
				<Image
					src={personaje.image}
					centered
					ui
					style={{ borderRadius: "15px" }}
				/>
				<Card.Content>
					<Card.Header>{personaje.name}</Card.Header>
				</Card.Content>
			</Card>
		</Grid.Column>
	);


	if (loading)
		return <Loader active inline="centered" content="Cargando personajes..." />;
	if (error)
		return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

	return (
		<>
			<Header
				as="h1"
				textAlign="center"
				color="teal"
				style={{
					marginBottom: "2rem",
					fontWeight: "bold",
					textShadow: "1px 1px #ccc",
				}}
				content="Bienvenido a la Página de Rick y Morty"
			/>
			<p
				style={{
					textAlign: "center",
					marginBottom: "2.3rem",
					fontWeight: "500",
					color: "green",
					textShadow: "1px 1px #ccc",
				}}
			>
				Acá verás a todos los Personajes de Rick y Morty ⬇️
			</p>

			{renderBusquedaInput()}

			{personajes.length === 0 ? (
				<p
					style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}
				>
					❌ No se encontraron personajes con ese nombre o ID.
				</p>
			) : (
				<>
					<Grid doubling stackable padded columns={4} textAlign="center">
						{personajes.map(renderPersonajeCard)}
					</Grid>

					{totalPages > 1 && (
						<Button.Group style={{ marginTop: "2rem" }}>
							<Button
								disabled={page === 1}
								icon="arrow left"
								content="Anterior"
								onClick={() => setPage(page - 1)}
							/>
							<Button disabled>
								Página {page} de {totalPages}
							</Button>
							<Button
								disabled={page === totalPages}
								icon="arrow right"
								content="Siguiente"
								labelPosition="right"
								onClick={() => setPage(page + 1)}
							/>
						</Button.Group>
					)}
				</>
			)}
		</>
	);
};

export default CharacterList;
