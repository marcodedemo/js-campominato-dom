
// al click del pulsante "genera" viene generata una griglia di 10*10 quadrati
// inserisco nelle celle i numeri progressivi da 1 a 100

// al click di una cella quest'ultima si colora di azzurro e stampa in console il numero inserito precedentemente dentro la cella


// grid generator button
let buttonGeneratorElement = document.getElementById("generator-btn");

// grid container
let gridContainerElement = document.getElementById("grid-container");

// difficulty selector
let difficultySelectorElement = document.getElementById("grid-difficulty");

// reset button
let resetGridButton = document.getElementById("grid-reset-btn");

// elemento testuale per punti e vittoria/sconfitta
let pointsTextElement = document.getElementById("points");

// grid rows and columns
let rowsAndColumns;

// imposto una variabile per la generazione massima di tabelle
let generatedGridCounter = 0;

// imposto una costante con valore uguale al numero di bombe da generare ad ogni partita
const bombsNumber = 16;

// creo un array in cui inserire i numeri delle celle contenenti le bombe
let bombCellsNumbers = [];

// creo un array contenente le celle bomba
let bombCells = [];

// imposto un contatore delle celle cliccate per stabilire il punteggio finale
let clickedCellNumber = 0;






// al click del pulsante generatore creo la griglia
buttonGeneratorElement.addEventListener("click", function(){

    
    // eseguo un controllo per l'esecuzione del codice (per non stampare tabelle sotto tabelle)
    while(generatedGridCounter < 1){


        // aggiungo al pulsante di reset la classe "show" per renderlo visibile
        resetGridButton.classList.add("show");


        // controllo il coefficiente di difficoltà della griglia generata e creo una griglia diversa in base all'input
        if(difficultySelectorElement.value == "Difficoltà-1"){

            // imposto la griglia 10*10 nella difficoltà-1
            rowsAndColumns = 10 * 10;

        }else if(difficultySelectorElement.value == "Difficoltà-2"){

            // imposto la griglia 9*9 nella difficoltà-2
            rowsAndColumns = 9 * 9;

        }else if(difficultySelectorElement.value == "Difficoltà-3"){

            // imposto la griglia 7*7 nella difficoltà-3
            rowsAndColumns = 7 * 7;
        }



        // creo un ciclo di creazione dei valori delle celle contenenti le bombe
        while (bombCellsNumbers.length < bombsNumber) {
            
            // imposto la variabile generated number per poterla poi inserire come valore all'interno dell'array
            let generatedNumber = generateRandomNumber(1,rowsAndColumns);

            // eseguo un controllo in caso il numero generato sia già presente nell'array 
            if (!bombCellsNumbers.includes(generatedNumber)){

                // inserisco il valore generato che ha superato il controllo nell'array
                bombCellsNumbers.push(generatedNumber);
            }
            
        };


        // creo un ciclo di creazione della griglia
        for (let i = 1; i <= rowsAndColumns; i++) {
            

            // dichiaro la variabile corrispondente al nuovo elmento creato
            let newCell = document.createElement("div");
            
            // se l'array dei numeri delle bombe contiene i allora la cella creata con indice i sarà una cella bomba
            if (bombCellsNumbers.includes(i)) {

                // controllata ogni cella e verificata che sia bomba o meno, se risulta cella bomba la inserisco nell'array delle celle bomba
                bombCells.push(newCell);
            }

            // ad ogni elemento creato attribuisco una classe comune 
            newCell.classList.add("grid-square");
            
            // dentro ad ogni elemento creato scrivo il valore di i 
            newCell.innerText = i;


            // attribuisco una dimensione diversa alle singole celle in base alla quantità di celle da creare
            if(rowsAndColumns == 100){

                // width e height della singola cella in caso le celle dovessero essere 100
                newCell.style.width = "63px";
                newCell.style.height = "63px";

            }else if(rowsAndColumns == 81){

                // width e height della singola cella in caso le celle dovessero essere 81
                newCell.style.width = "70px";
                newCell.style.height = "70px";

            }else if(rowsAndColumns == 49){

                // width e height della singola cella in caso le celle dovessero essere 49
                newCell.style.width = "90px";
                newCell.style.height = "90px";
            }


            // aggiungo l'evento click alle celle
            newCell.addEventListener("click", function(){



                // se clicco una cella che ha il numero di corrispondenza che è contenuto nell'array delle celle bomba
                if(bombCellsNumbers.includes(parseInt(newCell.textContent))){

                    // cliccata una bomba evidenzio tutte le celle bomba
                    for (let i = 0; i < bombCells.length; i++) {
                        
                        // aggiungo la classe "bomba" alle celle bomba
                        bombCells[i].classList.add("bomb");
                    }

                    // scrivo in console che hai cliccato una bomba e hai perso
                    console.log("Hai cliccato la cella " + newCell.innerText + " che era una bomba!!");

                    // rimuovo la possibilità di cliccare la griglia dopo aver cliccato una bomba
                    gridContainerElement.style.pointerEvents = "none";

                    // scrivo nel DOM il punteggio 
                    pointsTextElement.innerText = "HAI PERSO! hai totalizzato " + clickedCellNumber + " punto/i"
                    
                    pointsTextElement.style.color = "#bb1313";
                    

                }else{
                    
                    // al click della cella aggiungo la classe active
                    newCell.classList.add("active");
                    
                    // scrivo in console il numero della cella cliccata
                    console.log("Hai cliccato la cella " + newCell.innerText);

                    // aumento il contatore delle celle non bombe cliccate
                    clickedCellNumber++;
                    
                }

                // se tutte le celle senza bomba sono state cliccate allora scrivo nel dom che l'utente ha vinto
                if(clickedCellNumber == rowsAndColumns - bombsNumber){

                    // rimuovo la possibilità di cliccare la griglia dopo aver cliccato tutte le celle senza bomba
                    gridContainerElement.style.pointerEvents = "none";

                    pointsTextElement.innerText = "HAI VINTO! hai evitato tutte le bombe."
                    
                    pointsTextElement.style.color = "green";
                }

                
                
            },{once : true});


            // attribuisco la genitorialità al container dell'elemento creato
            gridContainerElement.append(newCell);



            // cliccando il pulsante di reset elimino gli elementi della griglia
            resetGridButton.addEventListener("click", function(){

                // rimuovo le celle della griglia
                newCell.remove();

                // rimuovo la classe che rende visibile il pulsante di reset
                resetGridButton.classList.remove("show");

                // reimposto la variabile sentinella 
                generatedGridCounter = 0;

                // rimuovo i numeri corrispondenti alle bombe dall'array per poterne generare di nuovi
                bombCellsNumbers = [];

                // rimuovo la scritta di vittoria/sconfitta
                pointsTextElement.innerText = "";

                // rendo la griglia cliccabile di nuovo per una nuova partita
                gridContainerElement.style.pointerEvents = "auto";



            })
        }


        generatedGridCounter++;
    }


});





/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */



// funzione che genera un numero casuale tra un valore minimo e un valore massimo dato 
function generateRandomNumber (min, max){

    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    return randomNumber;
}


