"use strict";
const sketchPad = document.getElementById('sketchpad');
const gridSizeInput = document.getElementById('grid-size');
const brushColorInput = document.getElementById('color');
const backgroundColorInput = document.getElementById('bg-color');
const eraserSwitch = document.getElementById('eraser');
const randomSwitch= document.getElementById('random');
const clearButton = document.getElementById('clear');
const toggleGridButton = document.getElementById('toggle-grid');
const root = document.documentElement;
let brushColor, isRandom = false, isEraser = false;

window.onload = createGrid;

function createGrid() {
	let square, i;

	clearGrid(); // Empty grid before creating a new one

	// Set CSS grid size according to input value
	root.style.setProperty('--grid-size', `repeat(${gridSizeInput.value}, minmax(9px, 72px))`);

	for (i = 0; i < gridSizeInput.value ** 2; i++) {
		square = document.createElement('div');
		square.setAttribute('class', `grid-square`);
		sketchpad.appendChild(square);

		square.addEventListener('mouseover', paintSquare);
	}
	getBrushcolor();
	getBackgroundColor();
}

// Change grid size on input element
gridSizeInput.addEventListener('change', function() {
	createGrid();
});

function clearGrid() {
	while (sketchpad.firstChild) {
		sketchpad.removeChild(sketchpad.firstChild);
	}
}

brushColorInput.addEventListener('change', getBrushcolor);

function getBrushcolor() {
	brushColor = brushColorInput.value;
	root.style.setProperty('--hover-color', brushColor);
}

function paintSquare(e) {
	if (e.buttons == 1) { // Paint div if mouse button is pressed
		if (isRandom) {
			e.target.style.background = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
			return;
		}
		if (isEraser) {
			e.target.style.background = '';
			return;
		}
		e.target.style.background = brushColor;
	}
}


backgroundColorInput.addEventListener('change', getBackgroundColor);

function getBackgroundColor() {
	sketchpad.style.backgroundColor = backgroundColorInput.value;
}


eraserSwitch.addEventListener('change', toggleEraser);

function toggleEraser() {

	if(randomSwitch.checked) {
		randomSwitch.checked = false;
		isRandom = false;	
	}
	if (eraserSwitch.checked) {
		isEraser = true;
		return;	
	}
	isEraser = false;

	getBrushcolor();
}

randomSwitch.addEventListener('change', toggleRandomColor);

function toggleRandomColor() {
	if (eraserSwitch.checked) eraserSwitch.checked = false;

	if (randomSwitch.checked) {
		isRandom = true;
		return;
	}
	isRandom = false;
}

clearButton.addEventListener('click', function() {

	sketchpad.childNodes.forEach(function(node) {
		node.style.backgroundColor = '';
	});
});

toggleGridButton.addEventListener('click', function() {

	sketchpad.childNodes.forEach(function(node) {
		node.classList.toggle('grid-square');
	});
});