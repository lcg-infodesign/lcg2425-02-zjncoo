let glyphSize = 30; // Dimensione di ciascun glyph
let gutter = 10; // Spaziatura tra i glyph
let margin = 20; // Margine esterno del canvas

function setup() {
  createCanvas(windowWidth, windowHeight); // Canvas dimensioni finestra
  background(0); // Sfondo nero
  noLoop();
}

function draw() {
  drawGrid(); // Funzione disegno griglia 
}

function drawGrid() {
  background(0); // Azzera il canvas ogni volta che si ridisegna la griglia
  
  // Calcolo il numero intero di colonne e righe che si adattano senza uscire dai bordi
  let columns = floor((windowWidth - 2 * margin) / (glyphSize + gutter)); //floor serve per avere un numero intero per difetto di righe e colonne, divido lo spazio occupato dalla griglia (spazio canvas - margini) per lo spazio occupato dal glyph + gutter
  let rows = floor((windowHeight - 2 * margin) / (glyphSize + gutter)); //(altezza finestra - margini) (sopra, sotto) fratto (glyph + gutter)
  
  // Calcolo un offset per centrare i glifi nel canvas, tenendo conto del margine
  let offsetX = margin + (windowWidth - 2 * margin - columns * (glyphSize + gutter)) / 2; //windowWidth - 2 * margin = area disegnabile nel canvas, columns * (glyphSize + gutter) = spazio occupato dalle colonne della griglia, /2 = calcola lo spazio a destra e a sinistra non occupato dalla griglia ma disegnabile, + margin = aggiungi alla distanza non usata dalla griglia a sinistra il margine per avere una distanza uguale a destra e a sinistra del canvas.
  let offsetY = margin + (windowHeight - 2 * margin - rows * (glyphSize + gutter)) / 2; //concetto della riga superiore ma in direzione verticale, offset dall'alto.

  // Disegno righe e colonne in cui si trovano i glyph
  for (let i = 0; i < columns; i++) {
    for (let r = 0; r < rows; r++) {
      push(); 
      // Traslo alla posizione in cui verrà disegnato il glifo, con offset e margine
      translate(
        offsetX + i * (glyphSize + gutter) + glyphSize / 2, //offsetX + i * (glyphSize + gutter) calcola l’inizio del glifo nella colonna corrente., glyphSize / 2 è aggiunto per allineare il centro del glifo con il punto di traslazione, in modo che ogni glifo venga posizionato esattamente al centro della cella della griglia.
        offsetY + r * (glyphSize + gutter) + glyphSize / 2 //offsetY + j * (glyphSize + gutter) è l’inizio della riga attuale., glyphSize / 2 viene aggiunto per centrare il glifo verticalmente rispetto alla cella.
      );
      rotate(int(random(0, 4)) * PI / 2);// Ruota casualmente il glifo di 0, 90, 180 o 270 gradi, int fornisce un numero intero senza arrotondamento ma solamente togliendo la parte decimale (0, 1, 2, 3) e lo moltiplica per 90° (PI / 2)
      drawGlyph(); // Funzione disegno del glyph
      pop(); 
    }
  }
}

function drawGlyph() {
  stroke(255); // Colore stroke del glyph bianco
  strokeWeight(1); 

  //Disegno baseline
  let baselineX1 = -15; // Estremo sinistro della linea di base
  let baselineX2 = 15; // Estremo destro della linea di base
  line(baselineX1, 0, baselineX2, 0); // Disegna la linea di base: punto 1=estremo sx a 0, punto 2=estremo dx e 0

  //Disegno linee perpendicolari alla baseline
  let numLineePerpendicolari = floor(random(3, 9)); // Numero intero casuale di linee perpendicolari (da 3 a 8)
  for (let i = 0; i < numLineePerpendicolari; i++) { //creazione di linee perpedicolari che si ripete un numero di volte uguale al numero random di linee
    let xPosition = random(baselineX1, baselineX2); // Posizione X casuale per la linea perpendicolare sulla baseline che va da -15 a 15.
    let lineLength = random(4, 20); // Lunghezza casuale della linea (da 4 a 20)
    // Disegno una linea perpendicolare che parte dalla linea di base
    line(xPosition, 0, xPosition, lineLength * random([-1, 1])); // Disegno linee casuale verso l'alto o verso il basso: posizione sulle x a partire da y=0, lunghezza della linea random * direzione verso l'alto (-1) o verso il basso (1)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ridimensione del canvas 
  drawGrid(); // Ridisegno della griglia quando la finestra viene ridimensionata
}
