//! need to map missions to pngs in assets
//! add group field to mission || rename pngs to mission titles
import { MOUNTAINS, adjacent, elementCoordinates } from "./utils.js";

export function mountainEncircle(board) {
	const matrix = board.grid;
	//* import mountain coordinates
	//* foreach mountain check
	//* (i, j-1), (i, j+1), (i-1, j), (i+1, j)
	//* (i-1, j+1), (i+1, j+1), (i-1, j-1), (i+1, j-1)
	//* 1 extra point for each mountain to meet conditions

	let points = 0;
	for (let [row, col] of MOUNTAINS) {
		//* grid is 0 based
		row--;
		col--;

		let getsPoints = true;
		// for (let i = row - 1; i < row + 2; i++) {
		// 	for (let j = col - 1; j < col + 2; j++) {
		// 		//* found an empty cell in the surroundings --> doesn't get extra point
		// 		if (matrix[i][j] == ".") getsPoints = false;
		// 	}
		// }

		if (
			[
				matrix[row - 1][col],
				matrix[row + 1][col],
				matrix[row][col + 1],
				matrix[row][col - 1],
			].some((cell) => cell === ".")
		) {
			getsPoints = false;
		}

		if (getsPoints) points++;
	}
	return points;
}

export function borderlands(board) {
	//* +6 points for each full row or column
	const matrix = board.grid;

	const countRowsFull = (matrix) => {
		let rowsFull = 0;
		matrix.forEach((row, i) => {
			if (row.every((c) => c !== ".")) rowsFull++;
		});
		return rowsFull;
	};
	const countColsFull = (matrix) => {
		let colsFull = 0;
		for (let col = 0; col < 11; col++) {
			let isFull = true;
			for (let row = 0; row < 11; row++) {
				if (matrix[row][col] === ".") {
					isFull = false;
					break;
				}
			}
			if (isFull) colsFull++;
		}
		return colsFull
	};

	//* check full rows
	let rowsFull = countRowsFull(matrix);

	//* check full columns
	let colsFull = countColsFull(matrix);

	return (rowsFull + colsFull) * 6;
}

export function sleepyValley(board) {
	const matrix = board.grid;
	let points = 0;
	for (const row of matrix) {
		const filtered = row.filter((cell) => cell === "#");
		if (filtered.length === 3) points += 4;
	}
	return points;
}

export function wateringPotatoes({ grid }) {
	let points = 0;
	//* get coordinated of farm fields
	const farms = elementCoordinates(grid, "F", { x: 0, y: 0 });

	//* for each adjacent water add 2 points
	for (const farm of farms) {
		if (adjacent(grid, farm, "W")) points += 2;
	}

	return points;
}

export function edgeOfTheForest({ grid }) {
	//* an element is adjacent to edge of the map if
	//* it's on the row 0, row 10, col 0, col 10
	let points = 0;
	const forests = elementCoordinates(grid, "#");
	for (const [row, col] of forests) {
		if (row == 0 || row == 10 || col == 0 || col == 10) points++;
	}
	return points;
}

//! test missions here

export const missions = {
	basic: [
		{
			title: "Edge of the forest",
			description:
				"You get one point for each forest field adjacent to the edge of your map.",
		},
		{
			title: "Sleepy valley",
			description:
				"For every row with three forest fields, you get four points.",
		},
		{
			title: "Watering potatoes",
			description:
				"You get two points for each water field adjacent to your farm fields.",
		},
		{
			title: "Borderlands",
			description: "For each full row or column, you get six points.",
		},
	],
	extra: [
		{
			title: "Tree line",
			description:
				"You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.",
		},
		{
			title: "Watering canal",
			description:
				"For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.",
		},
		{
			title: "Wealthy town",
			description:
				"You get three points for each of your village fields adjacent to at least three different terrain types.",
		},
		{
			title: "Magicians' valley",
			description:
				"You get three points for your water fields adjacent to your mountain fields.",
		},
		{
			title: "Empty site",
			description:
				"You get two points for empty fields adjacent to your village fields.",
		},
		{
			title: "Terraced house",
			description:
				"For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.",
		},
		{
			title: "Odd numbered silos",
			description:
				"For each of your odd numbered full columns you get 10 points.",
		},
		{
			title: "Rich countryside",
			description:
				"For each row with at least five different terrain types, you will receive four points.",
		},
	],
};
