import { reverse } from './reverse'

export const gameSelection = (selection: string, game: Game) => {
	return Object.entries(game)
		.filter(
			([word, { found }]) =>
				found === false &&
				(word === selection || word === reverse(selection))
		)
		.map(([word]) => word)
}
