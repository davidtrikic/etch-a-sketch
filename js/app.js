"use strict";

// Elements
const sketchPad = document.getElementById('sketchpad');
const gridSizeSelect = document.getElementById('grid-size-select');
const brushColorInput = document.getElementById('color');
const backgroundColorInput = document.getElementById('bg-color');
const eraserSwitch = document.getElementById('eraser');
const randomSwitch= document.getElementById('random');
const clearButton = document.getElementById('clear');
const gridLineSwitch = document.getElementById('toggle-grid');
const darkModeBtn = document.getElementById('dark-mode');
const contentWrapper = document.getElementById('content-wrapper');
const popupMsg = document.getElementById('popup');
const root = document.documentElement;

let brushColor, isRandom = false, isEraser = false;


window.onload = function() {
	backgroundSwitch();
	createGrid();
}


function createGrid() {
	let square, i;

	clearGrid(); // Empty grid before creating a new one

	// Set CSS grid size according to input value
	root.style.setProperty('--grid-size', `repeat(${gridSizeSelect.value}, minmax(1px, 94px))`);

	for (i = 0; i < gridSizeSelect.value ** 2; i++) {
		square = document.createElement('div');
		square.setAttribute('class', `grid-square`);
		sketchpad.appendChild(square);

		square.addEventListener('pointerover', paintSquare);
		square.addEventListener('pointerdown', paintSquare); // Listener for touch screens
	}
	getBrushcolor();
	getBackgroundColor();
}

// Change grid size on input element
gridSizeSelect.addEventListener('change', function() {
	createGrid();
})

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


backgroundColorInput.addEventListener('change', getBackgroundColor);

function getBackgroundColor() {
	sketchpad.style.backgroundColor = backgroundColorInput.value;
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
}

randomSwitch.addEventListener('change', toggleRandomColor);

function toggleRandomColor() {
	if (eraserSwitch.checked) {
		eraserSwitch.checked = false;
		isEraser = false;
	}

	if (randomSwitch.checked) {
		isRandom = true;
		return;
	}
	isRandom = false;
}

// Clear button
clearButton.addEventListener('click', function() {
	sketchpad.childNodes.forEach(function(node) {
		node.style.backgroundColor = '';
	});
});

// Grid lines switch
gridLineSwitch.addEventListener('click', function() {
	sketchpad.childNodes.forEach(function(node) {
		node.classList.toggle('grid-square');
	});
});

// Background switch
darkModeBtn.addEventListener('click', backgroundSwitch);

function backgroundSwitch() {
	if (document.body.classList.contains('dark-mode')) {
		contentWrapper.style.backgroundImage = 'url(images/wickedbackground_dark.svg)';
		return;
	} 
	contentWrapper.style.backgroundImage = 'url(images/wickedbackground.svg)';
}

// Popup message
setTimeout(function(){
	popupMsg.classList.add('popup-hidden');
}, 7000)
