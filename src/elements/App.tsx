import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getRandomEntries } from '../functions'
import { WORDS } from '../constants'

import { generateWordSearch } from '../generateWordSearch'

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
		setWords(getRandomEntries(WORDS, amount, 15))
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
			<Search width={width} height={height} grid={grid} />
		</Wrapper>
	)
}

export default App
