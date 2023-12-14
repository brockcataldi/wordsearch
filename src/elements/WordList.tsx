import styled from 'styled-components'

const List = styled.ul`
	list-style-type: none;
	padding: 1rem;
	margin: 0;
	position: relative;
    border-left: 2px solid black;
`

interface Word {
	$found: boolean
}

const Word = styled.li<Word>`
	position: relative;
	font-weight: 700;
	width: fit-content;

	${({ $found }) => {
		return $found
			? `
            &:after{
                content: '';
                width: 100%;
                height: 4px;
                background-color: red;
                position: absolute;
                top: calc(50% - 2px);
                left: 0;
            }
        `
			: ''
	}}
`

interface WordList {
	game: Game
}

const WordList = ({ game }: WordList) => {
	return (
		<List>
			{Object.entries(game)
				.sort((a, b) => a[0].localeCompare(b[0]))
				.map(([word, { found }]) => (
					<Word key={word} $found={found}>
						{word}
					</Word>
				))}
		</List>
	)
}

export default WordList
