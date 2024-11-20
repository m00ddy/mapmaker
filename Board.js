import { MOUNTAINS, TYPES } from "./utils.js";

export class Board {
	constructor() {
		//* create initial grid and populate with mountains
		this.grid = [];
		for (let i = 0; i < 11; i++) {
			let row = [];
			for (let j = 0; j < 11; j++) {
				row.push(".");
			}
			this.grid.push(row);
		}
		for (const m of MOUNTAINS) {
			const [x, y] = m;
			this.grid[x - 1][y - 1] = TYPES["mountain"];
		}
		//* fancier way to do this
		// this.grid = Array(11)
		// 	.fill()
		// 	.map(() => ".".repeat(11).split(""));
		// MOUNTAINS.forEach((m) => {
		// 	let [x, y] = m;
		// 	this.grid[x - 1][y - 1] = "M";
		// });

	}

	printBoard() {
		console.table(this.grid);
		// const range = Array.from({ length: 11 }, (value, index) => index);
		// console.log(range.join("  "));
		// this.grid.forEach((row, i) => {
		// 	console.log(i, "", row.join("  "));
		// });
	}
	addElement(x, y, element) {
		const check = this.checkBeforeInserting(x, y, element);
		if (check) {
			const requiredPositions = check;
			for (const [i, j] of requiredPositions) {
				console.log("[BOARD] adding element on ", i, j);
				this.grid[i][j] = TYPES[element.type];
			}
		} else {
			console.log("[BOARD] couldn't add element");
			return null;
		}
		return this;
	}
	checkBeforeInserting(x, y, element) {
		//* (x, y) --> top left corner coords
		//* all element matrices are 3x3

		// console.log(x, y);

		const matrix = element.shape;

		//* check if desired top corner is inside the grid
		if (x < 0 || x > 10 || y < 0 || y > 10) {
			console.log("[BOARD] out of range");
			return false;
		}
		//* check for overflow
		//! this is wrong
		/* 		if (x + 3 > 10 || y + 3 > 10) {
			console.log("[BOARD] out of range")
			return false;
		} */
		//* check: matrix(1) --> this.grid(.)
		//* 1. get the (i, j) of every 1 in the matrix
		const requiredPositions = [];
		let check = true;
		matrix.forEach((row, i) => {
			row.forEach((v, j) => {
				// if (v === 1) requiredPositions.push([i + x, j + y]);
				if (v === 1) {
					requiredPositions.push([x + i, y + j]);
					if (x + i < 0 || x + i > 10 || y + j < 0 || y + j > 10) {
						check = false;
						return;
					}
				}
			});
			if (!check) return;
		});
		if (!check) return false;
		// console.log(requiredPositions);
		//* 2. check if grid(i, j) --> .
		for (const [i, j] of requiredPositions) {
			console.log(i, j);
			if (this.grid[i][j] !== ".") {
				console.log("[BOARD] ", i, j, this.grid[i][j]);
				// console.log("check not passed");
				return false;
			}
		}

		//* all conditions passed
		return requiredPositions;
	}
	static equals(b1, b2) {
		for (let i = 0; i < b1.length; i++) {
			for (let j = 0; j < i.length; j++) {
				if (b1[i][j] !== b2[i][j]) return false;
			}
		}
		return true;
	}
}
