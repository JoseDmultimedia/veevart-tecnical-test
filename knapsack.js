//Declaramos e inicializamos las constantes para el test
//Cada elemento esta dado por peso - valor

const elements = [[2,3],[3,4],[4,5],[5,6]];
const capacity = 8;
const currentIndex = elements.length - 1;


//Función del knapsack, usa recursividad, brute force para hallar los valores
//que cumplen con la condición de maximo valor con respecto a al peso y la capacidad de la 
//mochila.
function getKnapsack(capacity, currentIndex, elements){
    
    //Condición que chequea la capacidad del knapsack y los items que quedan
    if(capacity === 0 || currentIndex === 0){
        return {value : 0, items : []};
    }
    //Destructuración del array de elementos para tener pesos y valores
    const [currentWeight, currentValue] = elements[currentIndex];

    //Condición para cuando el currentWeight es menor a la capacidad de la mochila
    //por lo que se decide si incluirla o excluirla
    if (currentWeight <= capacity) {
        const includeItem = getKnapsack(capacity - currentWeight, currentIndex - 1, elements);
        const excludeItem = getKnapsack(capacity, currentIndex - 1, elements);

        // Escoge el valor maximo
        if (currentValue + includeItem.value > excludeItem.value) {
            return {
                value: currentValue + includeItem.value,
                items: [...includeItem.items, currentIndex],
            };
        } else {
            return excludeItem;
        }
    }
    // Si el currentWeight es mayot a la capacidad se excluye
    return getKnapsack(capacity, currentIndex - 1, elements);
}

const solution = getKnapsack(capacity, currentIndex, elements);

console.log("Valor maximo que se puede llevar" , solution.value);
console.log("Items incluidos en la mochila", solution.items.map(index => elements[index]));
//Bonus ---------------------------------------------
console.log("---------------------Bonus------------------------")
console.log("Valor restante excluido", (elements.filter((_, index) => !solution.items.includes(index))).reduce((acumulador, subarray) => acumulador + subarray[1], 0));
console.log("Items excluidos de la mochila", elements.filter((_, index) => !solution.items.includes(index)) )
