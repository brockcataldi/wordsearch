export const initalizeGame = (words: string[]): Game => {
	return words.reduce((accumulator, word) => {
		return {
			...accumulator,
			...{ [word]: { found: false, bounds: null } },
		}
	}, {})
}
