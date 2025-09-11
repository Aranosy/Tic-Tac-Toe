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

let  isPlayer = true; // If player does first move
let moveCount = 0; // Count moves
let winner = false;
squares.forEach(square => {
    square.square.addEventListener('click', () => {
        if (square.symbol === "")
        {
            square.square.innerHTML = '<?xml version="1.0" encoding="iso-8859-1"?> <svg class="cross" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"> <g> <g> <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "/> </g> </g> </svg>'
            square.symbol = "x";
            moveCount++;
            if (moveCount >= 3)
            {
                winner = checkWin();
                if (winner !== false)
                {
                    console.log("We have a winner!: " + winner.symbol + " combination: " + winner.combination);
                }
            }
            // aiMove();
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
        for (let i = 0; i < circle.length; i ++)
        {
            if (circle[i] == element[i])
                coincided++;
        }
        if (coincided === 3)
        {
            winner = { 
                symbol: "o",
                combination: element
            };
        }
    });

    if (isPlayer)
    {
        if ((cross.length === 5) && (circle.length === 4))
            return "tie";
    }
    else if ((cross.length === 4)) {
        return  "tie";
    }

    return winner;
};


function getRandomMove() {
  return Math.floor(Math.random() * 9);
}

let setCircle = (square) => {
    square.square.innerHTML = '<?xml version="1.0" encoding="utf-8"?> <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
    square.symbol = "o";
};

let checkCombinations = (circle) => {
    // Scroll thruogh all possible win combinations with our circles
    let winnerMove = 0; 
    combiations.forEach((element) => {
    let coincided = 0; // Count same values
        for (let i = 0; i < circle.length; i ++)
        {
            if (circle[i] == element[i])
                coincided++;
        }
    });

};

let aiMove = () => {    
    // Make first move
    if (moveCount === 0)
    {
        if (squares[5].symbol === "")
        {   
            setCircle(squares[5].square);
        }
        else 
            setCircle(squares[getRandomMove].square); // Center taken, just take random circle
    }
    else 
    {
        let cross = [];
        let circle = [];
        getXnO(cross, circle);
        

        // Check for possible win combinations with circles
        checkCombinations(circle);
    }
};
