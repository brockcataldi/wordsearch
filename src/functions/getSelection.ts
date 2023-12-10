import { Direction } from '../constants'
import { getDirection } from './getDirection'

export const getSelection = (
	bounds: HighlightBounds,
	grid: string[][]
) => {
	const { start, end } = bounds

	switch (getDirection(bounds)) {
		case Direction.HORIZONTAL:
			return grid[start.y].slice(start.x, end.x + 1).join('')

		case Direction.HORIZONTAL_REVERSE:
			return grid[start.y].slice(end.x, start.x + 1).join('')

		case Direction.VERTICAL:
			return grid
				.slice(start.y, end.y + 1)
				.map((row) => row[start.x])
				.join('')

		case Direction.VERTICAL_REVERSE:
			return grid
				.slice(end.y, start.y + 1)
				.map((row) => row[start.x])
				.join('')

		case Direction.BACKWARD:
			return grid
				.slice(start.y, end.y + 1)
				.map((row, index) => row[start.x + index])
				.join('')

		case Direction.BACKWARD_REVERSE:
			return grid
				.slice(end.y, start.y + 1)
				.map((row, index) => row[end.x + index])
				.join('')

		case Direction.FORWARD:
			return grid
				.slice(start.y, end.y + 1)
				.map((row, index) => row[start.x - index])
				.join('')

		case Direction.FORWARD_REVERSE:
			return grid
				.slice(end.y, start.y + 1)
				.map((row, index) => row[end.x - index])
				.join('')

		case Direction.POINT:
		default:
			return grid[bounds.start.y][bounds.start.x]
	}
}
