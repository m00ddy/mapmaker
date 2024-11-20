console.log("WORKING");
//************************ imports ********************* */
import { Board } from "./Board.js";
import { Picker } from "./Picker.js";
/*  grabbing elements array */
// element: time, type, shape, rotation, mirrored
import { elements } from "./elements.js";
import { shuffleArray, elementCoordinates, SYMBOLS } from "./utils.js";

import * as missions from "./missions.js";

//******************************************************* */

//************************ functions ******************** */
// https://stackoverflow.com/a/70789108
// function getPromiseFromEvent(item, event) {
//   return new Promise((resolve) => {
//     const listener = () => {
//       item.removeEventListener(event, listener);
//       resolve();
//     }
//     item.addEventListener(event, listener);
//   })
// }

function getPromiseFromEvent(item, event) {
	return new Promise((resolve) => {
		const listener = (e) => {
			item.removeEventListener(event, listener);
			resolve(e);
		};
		item.addEventListener(event, listener);
	});
}

function drawBoardDOM(board) {
	//* takes a board objects and builds a DOM element

	const table = document.createElement("table");
	table.attributes.className = "MYtable";

	//! debugging
	//! don't delete this it might lead to something
	//! keep experimenting with getting x, y from the promise first
	// table.addEventListener("click", (e) => {
	// 	console.log(e.clientX, e.clientY);
	// });

	//* fill in the rows
	board.grid.forEach((row, i) => {
		const r = document.createElement("tr");
		r.id = i;
		r.style.height = "50px";

		row.forEach((cell, j) => {
			const c = document.createElement("td");
			//! for debug purposes
			// c.innerText = i + ", " + j;
			c.style.width = "50px";
			c.style.padding = "0px";
			const img = document.createElement("img");
			img.src = tilesDir + SYMBOLS[cell] + ".svg";
			img.style.height = "50px";
			c.appendChild(img);
			r.appendChild(c);
		});
		table.appendChild(r);
	});
	// gridWrapper.appendChild(table);
	console.log("finished building table");
	return table;
}

function drawPickerScreen(picker) {
	const elmMatrix = picker.matrix;
	const elmType = picker.currElm.type;

	const wrapperDiv = document.createElement("div");
	// wrapperDiv.className = "pickerWrapperDiv"
	const table = document.createElement("table");
	table.className = "pickerTable";

	//* build 3x3 table
	elmMatrix.forEach((row) => {
		const tableRow = document.createElement("tr");
		tableRow.style.height = "50px";
		row.forEach((cell) => {
			const tableCell = document.createElement("td");
			tableCell.style.width = "50px";
			if (cell == 1) {
				const img = document.createElement("img");
				img.src = tilesDir + elmType + ".svg";
				img.style.height = "50px";
				tableCell.appendChild(img);
			} else {
				table.style.backgroundColor = "#439d34a8";
			}
			tableRow.appendChild(tableCell);
		});
		table.appendChild(tableRow);
	});
	console.log("finished building the screen");
	wrapperDiv.appendChild(table);
	wrapperDiv.style.display = "inline-block";
	// wrapperDiv.style.backgroundColor = "teal"
	wrapperDiv.style.width = "200px";

	//TODO add time icon and value for the element
	const timeUnit = document.createElement("p");
	timeUnit.innerText = "⌚: " + picker.currElm.time;
	timeUnit.style.margin = "5px";
	wrapperDiv.appendChild(timeUnit);
	const warn = document.createElement("p");
	warn.innerText = "element is placed from top left corner, even if it's empty";
	warn.style.fontSize = "xx-small";
	wrapperDiv.appendChild(warn);

	//* transformation buttons
	const mirrorButton = document.createElement("button");
	mirrorButton.innerText = "Mirror";
	mirrorButton.className = "minimalist-button";
	const rotateButton = document.createElement("button");
	rotateButton.innerText = "Rotate";
	rotateButton.className = "minimalist-button";

	mirrorButton.addEventListener("click", (e) => {
		//TODO this needs to be implemented better

		picker.mirror();
		table.remove();
		timeUnit.remove();
		mirrorButton.remove();
		rotateButton.remove();
		warn.remove();
		const newPickerScreen = drawPickerScreen(picker);
		wrapperDiv.appendChild(newPickerScreen);
		//! NEED TO UPDATE THE CURRENT ELEMENT MATRIX
	});

	rotateButton.addEventListener("click", (e) => {
		picker.rotate();
		table.remove();
		timeUnit.remove();
		warn.remove();
		rotateButton.remove();
		mirrorButton.remove();
		const newPickerScreen = drawPickerScreen(picker);
		wrapperDiv.appendChild(newPickerScreen);
	});

	wrapperDiv.appendChild(rotateButton);
	wrapperDiv.appendChild(mirrorButton);
	return wrapperDiv;
}

function drawScoreScreen(scoreObj) {
	//! TODO modify this to take scoreObject and display mission scores and a final score
	console.log("GAME OVER");
	console.log(Object.values(scoreObj));
	// const score =Object.values(scoreObj).reduce((cum, curr) => cum+curr, 0)
	// console.log(score)

	//* black screen is the scoreboard
	const blackScreen = document.createElement("div");
	blackScreen.className = "scoreboard";
	const finalScore = document.createElement("h1");
	finalScore.innerText =
		"Score: " + Object.values(scoreObj).reduce((cum, curr) => cum + curr, 0);
	// blackScreen.style.width = "500px";
	// blackScreen.style.height = "200px";
	// blackScreen.style.backgroundColor = "black";
	// p.innerText = "SCORE = " + score;
	blackScreen.style.textAlign = "center";
	// p.style.fontSize = "40px";
	blackScreen.appendChild(finalScore);
	blackScreen.appendChild(document.createElement("hr"));

	for (const mission of Object.keys(scoreObj)) {
		const missionScore = document.createElement("h2");
		missionScore.innerText = mission + ": " + scoreObj[mission];
		blackScreen.appendChild(missionScore);
	}

	pickerWrapper.appendChild(blackScreen);

	//* display score for each mission
	// function drawScoreBySeason() {}
}

/* function drawMissionsScreen() {
	const title = document.createElement("h1");
	title.innerText = "Missions";
	missionsWrapper.appendChild(title);
	let i = 0;
	const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];
	const missionPNGName = [
		"borderlands",
		"edgeOfTheForest",
		"sleepyValley",
		"wateringPotatoes",
	];
	for (const mission of missionPNGName) {
		// const missionDiv = document.createElement('div')
		const missionPNG = document.createElement("img");
		missionPNG.classList.add("mission-" + positions[i]);
		missionPNG.classList.add("mission");
		i++;
		missionPNG.src = "./assets/missions_eng/" + mission + ".png";
		// missionDiv.appendChild(missionPNG)
		missionsWrapper.append(missionPNG);
	}
}
 */
function drawMissionsScreen() {
	const title = document.createElement("h1");
	title.innerText = "Missions";
	title.style.color = "white";
	missionsWrapper.appendChild(title);

	const missionPNGName = [
		"borderlands",
		"edgeOfTheForest",
		"sleepyValley",
		"wateringPotatoes",
	];
	const blabla = [
		"borderlands",
		"edge of the forest",
		"sleepy valley",
		"watering potatoes",
	];
	const missionTable = document.createElement("table");
	missionTable.className = "missions";

	for (let i = 0; i < 2; i++) {
		const row = document.createElement("tr");
		for (let j = 0; j < 2; j++) {
			const cell = document.createElement("td");
			cell.className = "mission";
			const misImg = document.createElement("img");
			misImg.style.width = "100%";
			misImg.src =
				"./assets/missions_eng/" + missionPNGName[i * 2 + j] + ".png";
			misImg.id = blabla[i * 2 + j];
			cell.appendChild(misImg);
			row.appendChild(cell);
		}
		missionTable.appendChild(row);
	}

	/* 	for (const m of missionPNGName) {
		const cell = document.createElement("td");
		const misImg = document.createElement("img");
		misImg.style.width = "250px";
		misImg.style.height = "150px";
		misImg.src = "./assets/missions_eng/" + m + ".png";
		cell.appendChild(misImg);
		missionTable.appendChild(cell);
	} */
	missionsWrapper.appendChild(missionTable);
}
function drawSeasons(seasons) {
	//* returns a box element with 4 cards and a bottom text indicating cum score

	//* create wrapper
	const seasonsWrapper = document.createElement("div");
	seasonsWrapper.className = "seasonsWrapper";

	//* create season cards
	for (const s of seasons) {
		const season = document.createElement("div");
		const seasonName = document.createElement("h3");
		const seasonScore = document.createElement("p");
		seasonName.innerText = s.name + ":";
		seasonScore.innerText = s.score;
		season.classList.add("season", s.name);
		season.appendChild(seasonName);
		season.appendChild(seasonScore);
		seasonsWrapper.appendChild(season);
	}

	//* draw cum score
	// const cum = seasons.reduce((c, curr) => c+curr.score,0);

	const cum = Object.values(missionList).reduce((c, curr) => c + curr.score, 0);
	const cumScore = document.createElement("h3");
	cumScore.innerText = "Total: " + cum;

	seasonsWrapper.appendChild(cumScore);

	return seasonsWrapper;
}

function computeScore(currIdx) {
	//* operates on the seasons object
	const currSeason = seasons[currIdx];
	console.log("computing score for SEASON ", currSeason.name);
	for (const m of currSeason.missions) {
		const score = missionList[m].func(b);
		currSeason.score += score;
		missionList[m].score = score;
		console.log(score);
	}
}

//************************************* main ****************************** */

//* where to get tile svgs
const tilesDir = "./assets/tiles/";

//* shuffle elements
const shuffledElements = shuffleArray(elements);

//* initialize
let b = new Board();
let ps = new Picker(shuffledElements);
let time = 0;
let globalScore = 0;
let seasons = [
	{
		name: "spring",
		missions: ["borderlands", "watering potatoes"],
		score: 0,
	},
	{
		name: "summer",
		missions: ["watering potatoes", "edge of the forest"],
		score: 0,
	},
	{
		name: "autumn",
		missions: ["edge of the forest", "sleepy valley"],
		score: 0,
	},
	{
		name: "winter",
		missions: ["sleepy valley", "borderlands"],
		score: 0,
	},
];
// better to have it as an array; [spring, summer, autumn, winter]
// let seasons = [0, 0, 0, 0];
const missionNames = [
		"borderlands",
		"edge of the forest",
		"sleepy valley",
		"watering potatoes",
];

let missionList = {
	borderlands: { func: missions.borderlands, score: 0 },
	"edge of the forest": { func: missions.edgeOfTheForest, score: 0 },
	"watering potatoes": { func: missions.wateringPotatoes, score: 0 },
	"sleepy valley": { func: missions.sleepyValley, score: 0 },
	"+1 point for each mountain surrounded": {
		func: missions.mountainEncircle,
		score: 0,
	},
};

//* build basic wrappers
const gridWrapper = document.createElement("div");
gridWrapper.style.display = "inline-block";
gridWrapper.style.marginRight = "20px";

const pickerWrapper = document.createElement("div");
pickerWrapper.style.display = "inline-block";
pickerWrapper.style.textAlign = "center";
pickerWrapper.style.position = "absolute";

const missionsWrapper = document.createElement("div");
missionsWrapper.className = "missionContainer";
// missionsWrapper.style.display = "inline-block";

document.body.appendChild(gridWrapper);
document.body.appendChild(pickerWrapper);
document.body.appendChild(missionsWrapper);

async function main() {
	drawMissionsScreen();
	// time = 27;
	let newSeasonStart = true;
	while (time < 28) {
		const currSeason = Math.floor(time / 7);
		const nextSeason = Math.floor((time + ps.peekNextElmTime()) / 7);
		console.log(`curr: ${currSeason}, next: ${nextSeason}`);

		console.log("TIME: ", time);
		console.log("elapsed time in season ", time % 7);
		//* construct
		const table = drawBoardDOM(b);
		gridWrapper.appendChild(table);
		const picker = drawPickerScreen(ps);
		pickerWrapper.appendChild(picker);

		const timeScreen = document.createElement("div");
		timeScreen.className = "time-elapsed";
		const timeP = document.createElement("h2");
		timeP.innerText = "Time Elapsed: " + time + "/28";
		const timeInSeason = document.createElement("h3");
		timeInSeason.innerText = "Time Elapsed in Season: " + (time % 7) + "/7";
		const seasonsScreen = drawSeasons(seasons);

		timeScreen.appendChild(timeP);
		timeScreen.appendChild(timeInSeason);
		document.body.appendChild(timeScreen);
		document.body.appendChild(seasonsScreen);
		// drawMissionsScreen()

		//* did the season just start ?
		//* ---> highlight missions
		if (newSeasonStart) {
			newSeasonStart = false;
			//* clear past highlights
			for(const name of missionNames){
				const m = document.getElementById(name)
				m.style.boxShadow = null
			}
			const missionsToHighlight = seasons[currSeason].missions;
			for (const name of missionsToHighlight) {
				const m = document.getElementById(name);
				// m.style.boxShadow = "red 0px 20px 30px -10px";
				// m.style.boxShadow= "red 1.95px 1.95px 2.6px";
				m.style.boxShadow = "red 0px 1px 4px, red 0px 0px 0px 3px";
			}
			console.log("HIGHLIGHTED MISSIONS: ", missionsToHighlight);
		}
		//* wait for a click to change state
		const e = await getPromiseFromEvent(table, "click");
		const tile = {
			x: Math.floor((e.x - 10) / 52),
			y: Math.floor((e.y - 10) / 57),
		};
		console.log(tile.x, tile.y);

		//* place element on grid
		const newBoard = b.addElement(tile.y, tile.x, ps.currElm);

		//* handle element not placed
		if (newBoard) {
			console.log("new board");
			time += ps.currElm.time;
			ps = ps.nextPick();
			b = newBoard;
		}

		//* is the season ending after this pick ?
		//* ---> score missions
		if (nextSeason > currSeason) {
			computeScore(currSeason);
			newSeasonStart = true;
		}

		//* highlight season missions
		/* 		if(time%7 === 0){
			const m1ID = Math.floor(time/7)
			const m2ID = (m1ID+1)%7 
			console.log("IDS: ", m1ID, m2ID)
			//* grab missions
			const m1 = document.getElementById(m1ID)
			const m2 = document.getElementById(m2ID)
			for(const m of [m1, m2]){
				m.style.boxShadow = "red 0px 20px 30px -10px"
			}
			console.log("mission", m1.nodeType)
		} */

		//* remove (for refreshing)
		// missionTable.remove();
		seasonsScreen.remove();
		table.remove();
		picker.remove();
		timeScreen.remove();
	}
	//* what to do after game ends
	const tableAgain = drawBoardDOM(b);
	gridWrapper.appendChild(tableAgain);
	missionsWrapper.remove();
	//* scoring
	//! this will be modified upon adding seasons
	let scoreObj = {};
	for (const m of Object.keys(missionList)) {
		scoreObj[m] = missionList[m].score;
		// scoreObj[m] = Math.floor(Math.random()*10)
	}
	console.log(scoreObj);
	drawScoreScreen(scoreObj);
}

(async () => {
	console.log("entering main");
	await main();
})();
