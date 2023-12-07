import { useState, MouseEvent, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { clamp } from '../functions'
import Highlight from './Highlight'

const Container = styled.div`
	border: 2px solid black;
	border-radius: 1rem;
	padding: 1rem;
	position: relative;
`

const Grid = styled.div<{ $width: number; $height: number }>`
	width: 500px;
	height: 500px;
	display: grid;
	user-select: none;

	${({ $width, $height }) => {
		return `
            grid-template-columns: repeat(${$width}, 1fr);
            grid-template-rows: repeat(${$height}, 1fr);
        `
	}}
`

const Cell = styled.p`
	margin: 0;
	font-size: 16px;
	font-weight: 700;
	line-height: 1;
	display: grid;
	place-items: center;
	pointer-events: none;
`

interface SearchProps {
	width: number
	height: number
	grid: string[][]
}

const Search = ({ width, height, grid }: SearchProps) => {
	const ref = useRef<HTMLDivElement>(null)

	const [currentHighlight, setCurrentHighlight] =
		useState<HighlightBounds | null>(null)
	const [bounds, setBounds] = useState<DOMRect | null>(null);
	const [cellSize, setCellSize] = useState<number>(0);

	useEffect(() => {
		if (ref.current) {
			setBounds(ref.current.getBoundingClientRect())
		}
	}, [])

	useEffect(() => {
		if(bounds !== null){
			setCellSize(bounds.width / width)
		}
	}, [bounds])

	const getMousePosition = (
		event: MouseEvent<HTMLElement>
	): GridPosition | null => {

		if(bounds !== null){
			const { clientX, clientY } = event

			return {
				x: clamp(
					Math.floor(
						(clientX - bounds.left) / cellSize
					),
					0,
					width - 1
				),
				y: clamp(
					Math.floor(
						(clientY - bounds.top) / cellSize
					),
					0,
					height - 1
				),
			}
		}
		
		return null;
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
			setCurrentHighlight(null)
		}
	}

	return (
		<Container>
			{
				currentHighlight && cellSize ? <Highlight $cellSize={cellSize} $bounds={currentHighlight} $current={true} /> : null
			}
			<Grid
				ref={ref}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				$width={width}
				$height={height}
			>
				{grid.map((row, y) =>
					row.map((cell, x) => (
						<Cell key={`cell-${x}-${y}`}>{cell}</Cell>
					))
				)}
			</Grid>
			<pre>{JSON.stringify({ currentHighlight }, null, 4)}</pre>
		</Container>
	)
}

export default Search
