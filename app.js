const sketchPad = document.getElementById('sketchpad');
const gridSizeInput = document.getElementById('grid-size');



window.onload = createGrid;


function createGrid() {
	let square, i;

	clearGrid();
	sketchpad.setAttribute('class', `sketchpad sketchpad-${gridSizeInput.value}`);

	for (i = 0; i < gridSizeInput.value ** 2; i++) {
		square = document.createElement('div');
		square.setAttribute('class', `grid-square grid-square${gridSizeInput.value}`);
		sketchpad.appendChild(square);
	}
}

gridSizeInput.addEventListener('change', function() {
	createGrid();
})

function clearGrid() {
	while (sketchpad.firstChild) {
		sketchpad.removeChild(sketchpad.firstChild);
	}
}