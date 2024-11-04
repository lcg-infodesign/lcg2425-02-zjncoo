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
  // Calcolo il numero intero di colonne e righe che si adattano senza uscire dai bordi
  let columns = floor((windowWidth - 2 * margin) / (glyphSize + gutter)); //floor serve per avere un numero intero di righe e colonne
  let rows = floor((windowHeight - 2 * margin) / (glyphSize + gutter)); //altezza/larghezza finestra - margini (sopra, sotto/ lati) fratto il glifo + Gutter
  
  // Calcolo un offset per centrare i glifi nel canvas, tenendo conto del margine
  let offsetX = margin + (windowWidth - 2 * margin - columns * (glyphSize + gutter)) / 2; 
  let offsetY = margin + (windowHeight - 2 * margin - rows * (glyphSize + gutter)) / 2;

  // Disegno righe e colonne in cui si trovano i glyph
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      push(); 
      // Traslo alla posizione in cui verrà disegnato il glifo, con offset e margine
      translate(
        offsetX + i * (glyphSize + gutter) + glyphSize / 2, 
        offsetY + j * (glyphSize + gutter) + glyphSize / 2
      );
      rotate(int(random(0, 4)) * PI / 2);// Ruota casualmente il glifo di 0, 90, 180 o 270 gradi
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
  let numLineePerpendicolari = floor(random(3, 8)); // Numero intero casuale di linee perpendicolari (da 3 a 8)
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
