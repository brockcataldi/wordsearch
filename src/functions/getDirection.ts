import { Direction } from '../constants'

export const getDirection = (bounds: HighlightBounds): Direction => {
	const xDifference: number = bounds.end.x - bounds.start.x
	const yDifference: number = bounds.end.y - bounds.start.y

	const xPositive: boolean = xDifference < 0
	const yPositive: boolean = yDifference < 0

	const xDistance: number = Math.abs(xDifference) + 1
	const yDistance: number = Math.abs(yDifference) + 1

	if (xDistance === yDistance) {
		if (xDistance === 1) {
			return Direction.POINT
		}

		if (xPositive && yPositive) {
			return Direction.BACKWARD_REVERSE
		}

		if (!xPositive && !yPositive) {
			return Direction.BACKWARD
		}

		if (!xPositive && yPositive) {
			return Direction.FORWARD_REVERSE
		}

		if (xPositive && !yPositive) {
			return Direction.FORWARD
		}
	}

	if (xDistance > 0 && yDifference === 0) {
		return xPositive
			? Direction.HORIZONTAL_REVERSE
			: Direction.HORIZONTAL
	}

	if (yDistance > 0 && xDifference === 0) {
		return yPositive ? Direction.VERTICAL_REVERSE : Direction.VERTICAL
	}

	return Direction.POINT
}
