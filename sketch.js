let glyphSize = 30; // Dimensione di ciascun glyph
let spacing = 10; // Spaziatura tra i glyph
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
  let columns = floor((windowWidth - 2 * margin) / (glyphSize + spacing));
  let rows = floor((windowHeight - 2 * margin) / (glyphSize + spacing));
  
  // Calcolo un offset per centrare i glifi nel canvas, tenendo conto del margine
  let offsetX = margin + (windowWidth - 2 * margin - columns * (glyphSize + spacing)) / 2;
  let offsetY = margin + (windowHeight - 2 * margin - rows * (glyphSize + spacing)) / 2;

  // Disegno righe e colonne in cui si trovano i glyph
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      push(); 
      // Traslo alla posizione in cui verrà disegnato il glifo, con offset e margine
      translate(
        offsetX + i * (glyphSize + spacing) + glyphSize / 2, 
        offsetY + j * (glyphSize + spacing) + glyphSize / 2
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

  let baselineX1 = -15; // Estremo sinistro della linea di base
  let baselineX2 = 15; // Estremo destro della linea di base
  line(baselineX1, 0, baselineX2, 0); // Disegna la linea di base

  let numLineePerpendicolari = (random(3, 8)); // Numero casuale di linee perpendicolari (da 3 a 8)
  for (let i = 0; i < numLineePerpendicolari; i++) {
    let xPosition = random(baselineX1, baselineX2); // Posizione X casuale per la linea perpendicolare
    let lineLength = random(4, 20); // Lunghezza casuale della linea (da 4 a 20)
    // Disegno una linea perpendicolare che parte dalla linea di base
    line(xPosition, 0, xPosition, lineLength * random([-1, 1])); // Direzione linee casuale verso l'alto o verso il basso
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ridimensione del canvas 
  drawGrid(); // Ridisegno della griglia quando la finestra viene ridimensionata
}