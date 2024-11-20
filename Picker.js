//* picker object is a div that contains the
//* random element picker along with buttons to apply transformations (mirror, rotate)
//* div contains a table for rendering the random element and 2 buttons,
//* and a <P> for time units of current element

/* METHODS
 * nextPick() --> returns a new Picker screen, triggered when last element is placed on grid
 * mirror() --> returns a new Picker screen, with the element mirrored
 * rotate() --> returns a new Picker screen rotated 90 degrees clockwise
 * 

*/
//* data level manipulation
//* perform data manipulation on object then send to **draw function**
import { shuffleArray } from "./utils.js";
import { elements } from "./elements.js";
const elms = shuffleArray(elements);

export class Picker {
	constructor(elmArr, currIdx = 0) {
		this.elmArr = elmArr;
		this.currIdx = currIdx;
		this.currElm = this.elmArr[this.currIdx];
		this.matrix = this.currElm.shape;
	}

	nextPick() {
		//* won't be using shifting
		//* i'll use a sliding pointer
		if (this.currIdx == this.elmArr.length - 1) {
			return this;
		}
		this.currIdx++;
		return new Picker(this.elmArr, this.currIdx);
	}
	peekNextElmTime(){
		if(this.currIdx === this.elmArr.length - 1) return this.currElm.time
		return this.elmArr[this.currIdx+1].time
	}

	mirror() {
		// 3x3 matrix --> mirror == swap rows
		this.matrix.forEach((row) => {
			[row[0], row[2]] = [row[2], row[0]];
		});
		// return this;
	}
	rotate() {
		// Create a temporary matrix to store the rotated values
		const tempMatrix = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];

		// Perform the rotation
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				// Rotate the values 90 degrees clockwise
				tempMatrix[j][2 - i] = this.matrix[i][j];
			}
		}

		// Copy the rotated values back to the original matrix
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this.matrix[i][j] = tempMatrix[i][j];
			}
		}
	}
	printPicker() {
		//* for debuggin purposes
		console.log(this.elmArr[this.currIdx]);
		console.table(this.elmArr[this.currIdx].shape);
	}
}

let p = new Picker(elms, 0);
/* p.printPicker();
p.mirror();
p.printPicker(); */
/* for (let i = 0; i < 10; i++) {
	p.printPicker();
	p = p.nextPick();
}
 */
