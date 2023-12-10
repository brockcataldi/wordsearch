import { useState, MouseEvent, useEffect } from 'react'
import styled from 'styled-components'

import { useRect } from '../functions/useRect'
import { clamp } from '../functions/clamp'

import Highlight from './Highlight'

const Container = styled.div`
	border-radius: 1rem;
	position: relative;
`

const Grid = styled.div<{ $width: number; $height: number }>`
	width: 500px;
	height: 500px;
	display: grid;
	${({ $width, $height }) => {
		return `
            grid-template-columns: repeat(${$width}, 1fr);
            grid-template-rows: repeat(${$height}, 1fr);
        `
	}}
`

const Cell = styled.a`
	text-decoration: none;
	margin: 0;
	font-size: 16px;
	font-weight: 700;
	line-height: 1;
	display: grid;
	place-items: center;
	pointer-events: none;
	user-select: none;
	color: black;
`

interface SearchProps {
	width: number
	height: number
	grid: string[][]
	found: HighlightBounds[]
	onSelection: (bounds: HighlightBounds) => void
}

const Search = ({
	width,
	height,
	grid,
	found,
	onSelection,
}: SearchProps) => {
	const [gridRef, gridRect] = useRect()

	const [cellSize, setCellSize] = useState<number>(0)
	const [currentHighlight, setCurrentHighlight] =
		useState<HighlightBounds | null>(null)

	useEffect(() => {
		if (gridRect !== null) {
			setCellSize(gridRect.width / width)
		}
	}, [gridRect, width])

	const getMousePosition = (
		event: MouseEvent<HTMLElement>
	): GridPosition | null => {
		if (gridRect !== null) {
			const { clientX, clientY } = event

			return {
				x: clamp(
					Math.floor((clientX - gridRect.left) / cellSize),
					0,
					width - 1
				),
				y: clamp(
					Math.floor((clientY - gridRect.top) / cellSize),
					0,
					height - 1
				),
			}
		}

		return null
	}

	const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
		const mousePosition = getMousePosition(event)

		if (mousePosition !== null) {
			setCurrentHighlight({
				start: mousePosition,
				end: mousePosition,
			})
		}
	}

	const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
		if (currentHighlight !== null) {
			const mousePosition = getMousePosition(event)

			if (mousePosition !== null) {
				setCurrentHighlight({
					...currentHighlight,
					end: mousePosition,
				})
			}
		}
	}

	const handleMouseUp = () => {
		if (currentHighlight !== null) {
			onSelection(currentHighlight)
		}
		setCurrentHighlight(null)
	}

	return (
		<>
			<Container>
				{currentHighlight && cellSize ? (
					<Highlight
						$cellSize={cellSize}
						$bounds={currentHighlight}
						$current={true}
					/>
				) : null}
				{found.map((entry, index) => (
					<Highlight
						key={`found-${index}`}
						$cellSize={cellSize}
						$bounds={entry}
						$current={false}
					/>
				))}
				<Grid
					ref={gridRef}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					$width={width}
					$height={height}
				>
					{grid.map((row, y) =>
						row.map((cell, x) => (
							<Cell href="#" key={`cell-${x}-${y}`}>
								{cell}
							</Cell>
						))
					)}
				</Grid>
			</Container>
		</>
	)
}

export default Search
