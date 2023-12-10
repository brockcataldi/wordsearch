interface GridPosition {
	x: number
	y: number
}

interface HighlightBounds {
	start: GridPosition
	end: GridPosition
}

interface GameWord {
	found: boolean
	bounds: HighlightBounds
}

interface Game {
	[word: string]: GameWord
}
