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
