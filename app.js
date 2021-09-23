const sketchPad = document.getElementById('sketchpad');
const gridSizeInput = document.getElementById('grid-size');



window.onload = createGrid;


function createGrid() {
	let square, i;
	for (i = 0; i < gridSizeInput.value * gridSizeInput.value; i++) {
		square = document.createElement('div');
		square.setAttribute('class', `grid-square grid-square${gridSizeInput.value} draggable="false"`);
		sketchpad.appendChild(square);
	}
	alert(gridSizeInput.value);
}

