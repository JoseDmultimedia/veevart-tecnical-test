//declaramos e inicializamos constantes que se usaran en el juego, las posiciones
//de las escaleras y de las serpientes


const boardSize = (base) => {
    return Math.pow(base, 2)
};

const ladders = [
    [3, 11],
    [6, 17],
    [9, 18],
    [10, 12]
];

const snakes = [
    [14, 4],
    [19, 8],
    [22, 20],
    [24, 18]
]

//Funcion que verifica si el movimiento esta en las escaleras o las serpientes
function checkSnakeOrLadders(move, array, type) {
    for (let index = 0; index < array.length; index++) {
        if (move === array[index][0]) {
            console.log(`${type}, tu posición es ${array[index][1]}`)
            return {
                isLadderOrSnake: true,
                startPoint: array[index][0],
                endPoint: array[index][1]
            }
        } else {
            return {
                isLadderOrSnake: false
            }
        }
    }
}

//Función para obtener un tiro del dado, de 6 lados.
const rollDice = () => {
    const roll = (Math.floor(Math.random() * 6) + 1);
    console.log(`Se ha lanzado el dado y se obtuvo ${roll}`)
    return roll;
}

function game(ladders, snakes, boardSize) {
    let lastPostion = 0;
    console.log(`Posición inicial en el tablero, ${lastPostion}`)
    let move = 0;
    do {
        move = lastPostion + rollDice();
        console.log("Posición actualizada en el tablero", move)

        const checkLadders = checkSnakeOrLadders(move, ladders, "Subiste una escalera");
        const checkSnakes = checkSnakeOrLadders(move, snakes, "Bajaste por una serpiente");

        if (checkLadders.isLadderOrSnake) {
            lastPostion = checkLadders.endPoint;
        } else if (checkSnakes.isLadderOrSnake) {
            lastPostion = checkSnakes.endPoint;
        } else {
            lastPostion = move;
        }

        move === 25 ? console.log("Llegaste a la meta") : console.log("")

    } while (move <= boardSize);

    return "FInalizo el juego";
}



console.log(game(ladders, snakes, boardSize(5)));
