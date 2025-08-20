import {
	Button,
	Segment,
	Image,
	List,
	Container,
	Message,
	Header,
} from "semantic-ui-react";
import type { Character } from "../types/Character";

const styles = {
	container: {
		minHeight: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "2rem",
		textAlign: "center" as const,
	},
	segment: {
		maxWidth: 400,
		width: "100%",
	},
	image: {
		borderRadius: 10,
		marginBottom: 20,
		cursor: "pointer",
	},
};
interface Props {
	personaje: Character;
	onVolver: () => void;
}

const CharacterDetail: React.FC<Props> = ({ personaje, onVolver }) => {
	return (
		<Container style={styles.container}>
			<Segment raised padded style={styles.segment}>
				<a
					href={personaje.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Ver detalles completos de ${personaje.name} en la API`}
				>
					<Image
						centered
						src={personaje.image}
						size="medium"
						alt={personaje.name}
						style={styles.image}
					/>
				</a>

				<Message info compact size="tiny">
					Si quieres ver más detalles, haz clic en la imagen
				</Message>

				<Header as="h2" textAlign="center">
					{personaje.name}
				</Header>

				<List divided relaxed>
					<List.Item>
						<strong>Estado:</strong> {personaje.status}
					</List.Item>
					<List.Item>
						<strong>Especie:</strong> {personaje.species}
					</List.Item>
					<List.Item>
						<strong>Origen:</strong> {personaje.origin.name}
					</List.Item>
					{/* Puedes agregar más propiedades aquí si quieres */}
				</List>

				<Button
					color="blue"
					icon="arrow left"
					content="Volver"
					size="large"
					onClick={onVolver}
					aria-label="Volver al listado de personajes"
				/>
			</Segment>
		</Container>
	);
};

export default CharacterDetail;
