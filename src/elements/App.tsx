import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { WORDS } from '../constants'

import { gameSelection } from '../functions/gameSelection'
import { getSelection } from '../functions/getSelection'
import { getRandomEntries } from '../functions/getRandomEntries'
import { generateWordSearch } from '../functions/generateWordSearch'
import { initalizeGame } from '../functions/initializeGame'

import Search from './Search'
import WordList from './WordList'

const Wrapper = styled.main`
	display: grid;
	width: 100%;
	grid-template-columns: 534px 200px;
`

const Container = styled.div`
	padding: 1rem;
`

const Box = styled.div`
	max-width: 734px;
	margin: 0 auto;
	border: 2px solid black;
	border-radius: 0.5rem; 
	overflow: hidden;
`

const Header = styled.header`
	padding: 1rem;
	background-color: white;
	position: relative;
	z-index: 1;
	border-bottom: 2px solid black;
`

const Title = styled.h1`
	margin: 0;
`

const App = () => {
	const width = 15
	const height = 15
	const amount = 15

	const [words, setWords] = useState<string[]>([])
	const [grid, setGrid] = useState<string[][]>([])
	const [game, setGame] = useState<Game>({})

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
		<Box>
			<Header>
				<Title>Word Search</Title>
			</Header>
			<Wrapper>
				<Container>
					<Search
						width={width}
						height={height}
						grid={grid}
						found={Object.values(game)
							.map(({ bounds }) => bounds)
							.filter((bounds) => bounds !== null)}
						onSelection={onSelection}
					/>
				</Container>
				<WordList game={game} />
			</Wrapper>
		</Box>
	)
}

export default App
