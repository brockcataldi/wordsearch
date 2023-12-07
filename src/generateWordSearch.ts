import { random, create2DArray } from './functions'
import { MAX_ITERATIONS_PER_WORD } from './constants'

const placeWordHorizontal = (
	characters: string[],
	grid: string[][],
	width: number,
	height: number
): [boolean, string[][] | null] => {
	const copy = grid.map((arr) => {
		return arr.slice()
	})

	const y = random(0, height - 1)
	const x = random(0, width - characters.length - 1)

	for (let i = 0; i < characters.length; i++) {
		const cell = copy[y][x + i]
		const character = characters[i]

		if (cell !== '~' && cell !== character) {
			return [false, null]
		}

		copy[y][x + i] = character
	}

	return [true, copy]
}

const placeWordVertical = (
	characters: string[],
	grid: string[][],
	width: number,
	height: number
): [boolean, string[][] | null] => {
	const copy = grid.map((arr) => {
		return arr.slice()
	})

	const y = random(0, height - characters.length - 1)
	const x = random(0, width - 1)

	for (let i = 0; i < characters.length; i++) {
		const cell = copy[y + i][x]
		const character = characters[i]

		if (cell !== '~' && cell !== character) {
			return [false, null]
		}

		copy[y + i][x] = character
	}

	return [true, copy]
}

const placeWordForward = (
	characters: string[],
	grid: string[][],
	width: number,
	height: number
): [boolean, string[][] | null] => {
	const copy = grid.map((arr) => {
		return arr.slice()
	})

	const y = random(0, height - characters.length - 1)
	const x = random(0 + characters.length, width - 1)

	for (let i = 0; i < characters.length; i++) {
		const cell = copy[y + i][x - i]
		const character = characters[i]

		if (cell !== '~' && cell !== character) {
			return [false, null]
		}

		copy[y + i][x - i] = character
	}

	return [true, copy]
}

const placeWordBackward = (
	characters: string[],
	grid: string[][],
	width: number,
	height: number
): [boolean, string[][] | null] => {
	const copy = grid.map((arr) => {
		return arr.slice()
	})

	const y = random(0, height - characters.length - 1)
	const x = random(0, width - characters.length - 1)

	for (let i = 0; i < characters.length; i++) {
		const cell = copy[y + i][x + i]
		const character = characters[i]

		if (cell !== '~' && cell !== character) {
			return [false, null]
		}

		copy[y + i][x + i] = character
	}

	return [true, copy]
}

const placeWord = (
	word: string,
	grid: string[][],
	width: number,
	height: number
): [boolean, string[][]] => {
	const characters =
		random(0, 1) === 0 ? word.split('') : word.split('').reverse()

	let result: boolean = false
	let value: string[][] | null = null
	let iterations = 0

	while (iterations < MAX_ITERATIONS_PER_WORD) {
		const direction = random(0, 2)

		switch (direction) {
			case 3:
				;[result, value] = placeWordBackward(
					characters,
					grid,
					width,
					height
				)
				break

			case 2:
				;[result, value] = placeWordForward(
					characters,
					grid,
					width,
					height
				)
				break

			case 1:
				;[result, value] = placeWordVertical(
					characters,
					grid,
					width,
					height
				)
				break

			case 0:
			default:
				;[result, value] = placeWordHorizontal(
					characters,
					grid,
					width,
					height
				)
				break
		}

		if (result === true && value !== null) {
			return [result, value]
		}

		iterations++
	}

	return [false, grid]
}

export const generateWordSearch = (
	words: string[],
	width: number,
	height: number
): [{ [key: string]: boolean }, string[][]] => {
	const placedWords: { [key: string]: boolean } = {}
	let grid = create2DArray('~', width, height)

	for (let word of words.sort((a, b) => b.length - a.length)) {
		const [results, replacement] = placeWord(word, grid, width, height)

		if (results === true) {
			grid = replacement
			placedWords[word] = false
		}
	}

	return [placedWords, grid]
}
