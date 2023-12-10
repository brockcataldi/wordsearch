import { random } from "./random"

export const getRandomEntries = <T>(array: T[], amount: number): T[] => {
	const picks: T[] = []
	const arrayLength = array.length
	let found = false

	for (let i = 0; i < amount; i++) {
		found = false

		while (found === false) {
			const pick = array[random(0, arrayLength - 1)]
			if (picks.includes(pick) === false) {
				picks.push(pick)
				found = true
			}
		}
	}

	return picks
}
