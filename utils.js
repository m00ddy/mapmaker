export function shuffleArray(arr) {
	for (let i = 0; i < arr.length; i++) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export const MOUNTAINS = [
	[2, 2],
	[4, 9],
	[6, 4],
	[9, 10],
	[10, 6],
];
//* type --> symbol
export const TYPES = {
	farm: "F",
	forest: "#",
	water: "W",
	town: "T",
	mountain: "M",
};
//* symbol --> type
export const SYMBOLS = {
	F: "farm",
	"#": "forest",
	W: "water",
	T: "town",
	M: "mountain",
	".": "base",
};

export function elementCoordinates(matrix,	elem ,offset = { x: 0, y: 0 }) {
	//* returns vector of coordinates for all 1s in matrix
	//* matrix can be n*n
	//* offset {x, y} optional

	const vector = [];

	for (let i = 0; i < matrix.lenght; i++) {
		for (let j = 0; j < i.length; j++) {
			if (matrix[i][j] == elem) vector.push({ x: i + offset.x, y: j + offset.y });
		}
	}

	//* vector = list({x, y})
	return vector;
}

export function mirrorElement(matrix) {
	// 3x3 matrix --> mirror == swap rows
	//* swap first and last element of every arr in matrix
	matrix.forEach((element) => {});
}

export function rotateElement() {}

export function adjacent(matrix, {row, col}, item) {
	if (
		[
			matrix[row - 1][col],
			matrix[row + 1][col],
			matrix[row][col + 1],
			matrix[row][col - 1],
		].any((cell) => cell === item)
	) return true;

	return false
}

// module.exports = {
//     shuffleArray,
//     MOUNTAINS,
//     TYPES,
// }
