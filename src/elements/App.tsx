import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getDirection } from '../functions/getDirection'
import { getRandomEntries } from '../functions/getRandomEntries'
import { generateWordSearch } from '../functions/generateWordSearch'

import { WORDS } from '../constants'


import Search from './Search'

const Wrapper = styled.main`
	display: grid;
	grid-template-columns: 200px 534px 1fr;
	width: 100%;
	gap: 1rem;
`

const List = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
`

const Word = styled.li``

const App = () => {
	const width = 15
	const height = 15
	const amount = 15

	const [words, setWords] = useState<string[]>([])
	const [grid, setGrid] = useState<string[][]>([])
	const [tracked, setTracked] = useState<{ [key: string]: boolean }>({})

	useEffect(() => {
		setWords(getRandomEntries<string>(WORDS, amount))
	}, [])

	useEffect(() => {
		const [trackedWords, generatedGrid] = generateWordSearch(
			words,
			width,
			height
		)
		setGrid(generatedGrid)
		setTracked(trackedWords)
	}, [words, width, height])

	const onSelection = (bounds: HighlightBounds) => {
		const direction = getDirection(bounds);


	}

	return (
		<Wrapper>
			<List>
				{Object.entries(tracked)
					.sort((a, b) => a[0].localeCompare(b[0]))
					.map(([word, found]) => (
						<Word key={word}>
							{word} - {found ? 1 : 0}
						</Word>
					))}
			</List>
			<Search width={width} height={height} grid={grid} onSelection={onSelection} />
		</Wrapper>
	)
}

export default App
