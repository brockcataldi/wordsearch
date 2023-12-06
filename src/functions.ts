export const random = (minValue: number, maxValue: number) => {
	minValue = Math.ceil(minValue)
	maxValue = Math.floor(maxValue)
	return Math.floor(Math.random() * (maxValue - minValue) + minValue)
}

export const clamp = (
	value: number,
	minValue: number,
	maxValue: number
) => {
	return Math.min(Math.max(value, minValue), maxValue)
}

export const create2DArray = <T>(
	value: T,
	width: number,
	height: number
): T[][] => {
	if (width < 1 || height < 1) {
		return []
	}

	const rows: T[][] = []

	for (let y = 0; y < height; y++) {
		const row: T[] = []
		for (let x = 0; x < width; x++) {
			row.push(value)
		}
		rows.push(row)
	}
	return rows
}

export const getRandomEntries = (
	array: string[],
	amount: number,
	maxLength?: number
) => {
	const picks: string[] = []
	const arrayLength = array.length
	let found = false

	for (let i = 0; i < amount; i++) {
		found = false

		while (found === false) {
			const pick = array[random(0, arrayLength - 1)]
			if (picks.includes(pick) === false) {
				if (maxLength === undefined || pick.length < maxLength) {
					picks.push(pick)
					found = true
				}
			}
		}
	}

	return picks
}
