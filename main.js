// Game logic 
let squares = [];
let squareGrid = document.querySelectorAll(".square"); // List of all squares

for (let i = 0; i < squareGrid.length; i++)
{
    // Create list of square objects
    let square = {
        square: squareGrid[i],
        symbol: ""
    };
    squares.push(square);
    // squareGrid[i].innerHTML = '<?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    // squareGrid[i].firstElementChild.classList.add("circle");
}

squares.forEach(square => {
    square["square"].addEventListener('click', () => {
        if (square["symbol"] === "")
        {
            square["square"].innerHTML = '<?xml version="1.0" encoding="iso-8859-1"?> <svg class="cross" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"> <g> <g> <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "/> </g> </g> </svg>'
            square["symbol"] = "cross";
            isPlayer = false;
        }
    });
});