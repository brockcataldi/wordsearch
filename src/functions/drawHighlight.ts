import { Direction } from '../constants'
import { getDirection } from './getDirection'
import { css } from 'styled-components'

export const drawHighlight = (
	bounds: HighlightBounds,
	cellSize: number
) => {
	const xDifference: number = bounds.end.x - bounds.start.x
	const yDifference: number = bounds.end.y - bounds.start.y

	const xDistance: number = Math.abs(xDifference) + 1
	const yDistance: number = Math.abs(yDifference) + 1

	switch (getDirection(bounds)) {
		case Direction.VERTICAL:
			return css`
				top: ${cellSize * bounds.start.y}px;
				left: ${cellSize * bounds.start.x}px;
				height: ${cellSize * yDistance}px;
				width: ${cellSize}px;
			`
		case Direction.VERTICAL_REVERSE:
			return css`
				top: ${cellSize * bounds.end.y}px;
				left: ${cellSize * bounds.start.x}px;
				height: ${cellSize * yDistance}px;
				width: ${cellSize}px;
			`

		case Direction.HORIZONTAL:
			return css`
				top: ${cellSize * bounds.start.y}px;
				left: ${cellSize * bounds.start.x}px;
				width: ${cellSize * xDistance}px;
				height: ${cellSize}px;
			`
		case Direction.HORIZONTAL_REVERSE:
			return css`
				top: ${cellSize * bounds.start.y}px;
				left: ${cellSize * bounds.end.x}px;
				width: ${cellSize * xDistance}px;
				height: ${cellSize}px;
			`

		case Direction.BACKWARD:
			return css`
				top: ${cellSize * bounds.start.y + cellSize / 2}px;
				left: ${cellSize * bounds.start.x - cellSize / 4}px;
				width: ${cellSize}px;
				height: ${Math.hypot(
					cellSize * xDistance,
					cellSize * yDistance
				) -
				cellSize / 4}px;
				transform: rotate(-45deg);
				transform-origin: 0 0;
			`

		case Direction.BACKWARD_REVERSE:
			return css`
				top: ${cellSize * bounds.end.y + cellSize / 2}px;
				left: ${cellSize * bounds.end.x - cellSize / 4}px;
				width: ${cellSize}px;
				height: ${Math.hypot(
					cellSize * xDistance,
					cellSize * yDistance
				) -
				cellSize / 4}px;
				transform: rotate(-45deg);
				transform-origin: 0 0;
			`
		case Direction.FORWARD:
			return css`
				top: ${cellSize * bounds.start.y - cellSize / 4}px;
				left: ${cellSize * bounds.start.x + cellSize / 1.75}px;
				width: ${cellSize}px;
				height: ${Math.hypot(
					cellSize * xDistance,
					cellSize * yDistance
				) -
				cellSize / 4}px;
				transform: rotate(45deg);
				transform-origin: 0 0;
			`
		case Direction.FORWARD_REVERSE:
			return css`
				top: ${cellSize * bounds.end.y - cellSize / 4}px;
				left: ${cellSize * bounds.end.x + cellSize / 1.75}px;
				width: ${cellSize}px;
				height: ${Math.hypot(
					cellSize * xDistance,
					cellSize * yDistance
				) -
				cellSize / 4}px;
				transform: rotate(45deg);
				transform-origin: 0 0;
			`
		case Direction.POINT:
		default:
			return css`
				top: ${cellSize * bounds.start.y}px;
				left: ${cellSize * bounds.start.x}px;
				width: ${cellSize}px;
				height: ${cellSize}px;
			`
	}
}
