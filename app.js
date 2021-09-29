const sketchPad = document.getElementById('sketchpad');
const gridSizeInput = document.getElementById('grid-size');
const brushColorInput = document.getElementById('color');
const root = document.documentElement;

window.onload = createGrid;


function createGrid() {
	let square, i;

	clearGrid();

	// Set CSS grid size according to input value
	root.style.setProperty('--grid-size', `repeat(${gridSizeInput.value}, minmax(9px, 72px))`);

	for (i = 0; i < gridSizeInput.value ** 2; i++) {
		square = document.createElement('div');
		square.setAttribute('class', `grid-square`);
		sketchpad.appendChild(square);

		square.addEventListener('mousemove', paintSquare);
	}
}
// Change grid size on input element
gridSizeInput.addEventListener('change', function() {
	createGrid();
})


let brushColor = brushColorInput.value; // Get initial brush color
brushColorInput.addEventListener('change', getBrushcolor);


function getBrushcolor() {
	brushColor = brushColorInput.value;
}


// Empty grid brefore creating a new one
function clearGrid() {
	while (sketchpad.firstChild) {
		sketchpad.removeChild(sketchpad.firstChild);
	}
}

function paintSquare(e) {
	// Paint div if mouse button is pressed
	if (e.buttons == 1) {
		e.target.style.background = brushColor;
	}
}

