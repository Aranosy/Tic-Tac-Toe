// Game logic 
let squares = [];
let squareGrid = document.querySelectorAll(".square"); // List of all squares

// Win combinations
const combiations = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

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

let isCrossFirst = true;
let moveCount = 0; // Count moves
let winner = false;
let currentSymbol = 'x' // x starts
let isClear = false;
squares.forEach(square => {
    square.square.addEventListener('click', () => {
        if (isClear)
        {
            squares.forEach((element) => {
                element.square.innerHTML = "";
                element.symbol = "";
            });
            isClear = false;
        }
        else if (square.symbol === "")
        {
            square.square.innerHTML =  (currentSymbol === 'x') 
            ? '<?xml version="1.0" encoding="iso-8859-1"?> <svg class="cross" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"> <g> <g> <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "/> </g> </g> </svg>'
            : '<?xml version="1.0" encoding="utf-8"?> <svg class="circle" animation="popin 0.3s linear" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>';
            square.square.children[0].style = "animation: popout 0.1s linear;";
            square.square.children[0].addEventListener("animationend", () => {
                    square.square.children[0].style = "animation: ;";
            });
            square.symbol = currentSymbol;
            currentSymbol = (currentSymbol === 'x') ? 'o' : 'x'; // Change symbol
            moveCount++;
            if (moveCount >= 3)
            {
                winner = checkWin();
                if (winner !== false)
                {
                    isClear = true;
                    squares.forEach((element) => {
                        if (element.symbol !== "")
                            element.square.children[0].style = "filter: invert(50%);" 
                    });
                    if (winner.symbol !== undefined)
                    {
                        let score = document.querySelector('#' + winner.symbol);
                        score.textContent = parseInt(score.textContent) + 1;
                        score.style = "animation: popout 0.2s linear;"
                        winner.combination.forEach((element) => {
                            squares[element].square.children[0].style = "filter: invert(100%);"     
                            squares[element].square.children[0].style = "animation: blink 1s linear;";

                        });
                    }
                    else 
                    {
                        let score = document.querySelector('#tie');
                        score.textContent = parseInt(score.textContent) + 1;
                        score.style = "animation: popout 0.2s linear;"
                    }
                }
            }
            
        }
    });
});



let getXnO = (cross, circle) => {
    for (let i = 0; i < squares.length; i++)
    {
        if (squares[i].symbol === "x")
            cross.push(i);
        else if (squares[i].symbol === "o")
            circle.push(i);
    }
};

// Returns object if some wins, returns false if not
let checkWin = () => {
    // All win combiations
    let winner = false;
    
    // Write all X's and O's into arrays
    let cross = [];
    let circle = [];
    getXnO(cross, circle);

    // Check for each win combination for cross
    combiations.forEach((element) => {
        let coincided = 0; // Count for same values amount
        for (let i = 0; i < element.length; i ++)
        {
            cross.forEach((x) => {
                if (x == element[i])
                    coincided++;
            });
        }
        if (coincided === 3)
        {
            isCrossFirst = (isCrossFirst) ? false : true;
            winner = { 
                symbol: "x",
                combination: element
            };
        }
    });

    if (winner !== false)
        return winner;

    // Check for each win combination for circle
    combiations.forEach((element) => {
        let coincided = 0; // Count same values
        for (let i = 0; i < element.length; i ++)
        {
            circle.forEach((o) => {
                if (o == element[i])
                    coincided++;
            });
        }
        if (coincided === 3)
        {
            isCrossFirst = (isCrossFirst) ? false : true;
            winner = { 
                symbol: "o",
                combination: element
            };
        }
    });

    if (isCrossFirst)
    {
        if ((cross.length === 5) && (circle.length === 4))
        {
            isCrossFirst = (isCrossFirst) ? false : true;
            return "tie";
        }
    }
    else if ((cross.length === 4) && (circle.length === 5)) {
        isCrossFirst = (isCrossFirst) ? false : true;
        return  "tie";
    }

    isCrossFirst = (isCrossFirst) ? false : true;
    return winner;
};
