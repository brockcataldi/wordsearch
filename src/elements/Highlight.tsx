import styled, { css } from 'styled-components'
import { drawHighlight } from '../functions/drawHighlight'


interface HighlightProps {
	$bounds: HighlightBounds
	$cellSize: number
	$current: boolean
}


const Highlight = styled.div<HighlightProps>`
	position: absolute;
	box-sizing: border-box;
	pointer-events: none;

	${({ $cellSize, $bounds, $current }) => {
		return css`
			border-radius: ${$cellSize}px;
			border: 2px solid ${$current ? 'red' : 'black'};
			${drawHighlight($bounds, $cellSize)}
		`
	}}
`

export default Highlight
