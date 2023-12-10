import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getSelection } from '../functions/getSelection'
import { getRandomEntries } from '../functions/getRandomEntries'
import { generateWordSearch } from '../functions/generateWordSearch'
import { initalizeGame } from '../functions/initializeGame'
import { gameSelection } from '../functions/gameSelection'

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
	const [game, setGame] = useState<Game>({})
	// const [selection, setSelection] = useState<string>('')

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
		setGame(initalizeGame(trackedWords))
	}, [words, width, height])

	const onSelection = (bounds: HighlightBounds) => {
		const selection = getSelection(bounds, grid)
		const found = gameSelection(selection, game)

		if (found.length > 0) {
			const [word] = found

			setGame({
				...game,
				...{
					[word]: {
						found: true,
						bounds,
					},
				},
			})
		}
	}

	return (
		<Wrapper>
			<List>
				{Object.entries(game)
					.sort((a, b) => a[0].localeCompare(b[0]))
					.map(([word, data]) => (
						<Word key={word}>
							{word} - {data.found ? 1 : 0}
						</Word>
					))}
			</List>
			<Search
				width={width}
				height={height}
				grid={grid}
				found={Object.values(game)
					.map(({ bounds }) => bounds)
					.filter((bounds) => bounds !== null)}
				onSelection={onSelection}
			/>
		</Wrapper>
	)
}

export default App
