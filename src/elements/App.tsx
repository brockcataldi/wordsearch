import { useEffect, useState } from 'react'
import { getRandomEntries } from '../functions'

import { WORDS } from '../constants'

const App = () => {
	const width = 15
	const height = 15
	const amount = 15

	const [grid, setGrid] = useState<string[][]>([])
	const [words, setWords] = useState<string[]>([])

	useEffect(() => {
		const words = getRandomEntries(WORDS, amount, 15)

		setWords(words)
	}, [])

	return (
		<>
			<pre>{JSON.stringify({ grid, words }, null, 4)}</pre>
		</>
	)
}

export default App
