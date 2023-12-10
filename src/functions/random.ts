export const random = (minValue: number, maxValue: number) => {
	minValue = Math.ceil(minValue)
	maxValue = Math.floor(maxValue)
	return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
}
