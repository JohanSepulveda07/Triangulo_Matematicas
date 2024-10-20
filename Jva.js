document.getElementById('triangleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ladoA = parseFloat(document.getElementById('ladoA').value);
    const ladoB = parseFloat(document.getElementById('ladoB').value);
    const ladoC = parseFloat(document.getElementById('ladoC').value);

    if (ladoA <= 0 || ladoB <= 0 || ladoC <= 0) {
        mostrarResultados("Los lados deben ser mayores que cero.");
        return;
    }

    if (!esTrianguloValido(ladoA, ladoB, ladoC)) {
        mostrarResultados("Los lados ingresados no forman un triángulo válido.");
        return;
    }

    const anguloA = calcularAngulo(ladoB, ladoC, ladoA);
    const anguloB = calcularAngulo(ladoA, ladoC, ladoB);
    const anguloC = calcularAngulo(ladoA, ladoB, ladoC);

    const tipoLados = caracterizarLados(ladoA, ladoB, ladoC);
    const tipoAngulos = caracterizarAngulos(anguloA, anguloB, anguloC);

    mostrarResultados(`
        Lado A: ${ladoA} <br>
        Lado B: ${ladoB} <br>
        Lado C: ${ladoC} <br><br>
        Ángulo A: ${anguloA.toFixed(2)}° <br>
        Ángulo B: ${anguloB.toFixed(2)}° <br>
        Ángulo C: ${anguloC.toFixed(2)}° <br><br>
        Clasificación por lados: ${tipoLados} <br>
        Clasificación por ángulos: ${tipoAngulos}
    `);

    dibujarTriangulo(ladoA, ladoB, ladoC);
});

// Ley de cosenos para calcular ángulos
function calcularAngulo(lado1, lado2, lado3) {
    return (Math.acos((Math.pow(lado1, 2) + Math.pow(lado2, 2) - Math.pow(lado3, 2)) / (2 * lado1 * lado2)) * (180 / Math.PI));
}

// Verificar si los lados forman un triángulo válido
function esTrianguloValido(ladoA, ladoB, ladoC) {
    return ladoA + ladoB > ladoC && ladoA + ladoC > ladoB && ladoB + ladoC > ladoA;
}

// Caracterizar el triángulo según los lados
function caracterizarLados(ladoA, ladoB, ladoC) {
    if (ladoA === ladoB && ladoB === ladoC) {
        return "Equilátero";
    } else if (ladoA === ladoB || ladoA === ladoC || ladoB === ladoC) {
        return "Isósceles";
    } else {
        return "Escaleno";
    }
}

// Caracterizar el triángulo según los ángulos
function caracterizarAngulos(anguloA, anguloB, anguloC) {
    if (anguloA === 90 || anguloB === 90 || anguloC === 90) {
        return "Rectángulo";
    } else if (anguloA < 90 && anguloB < 90 && anguloC < 90) {
        return "Acutángulo";
    } else {
        return "Obtusángulo";
    }
}

// Mostrar los resultados en la página
function mostrarResultados(texto) {
    document.getElementById('resultados').innerHTML = texto;
}

// Dibujar triángulo en SVG
function dibujarTriangulo(ladoA, ladoB, ladoC) {
    const svg = document.getElementById('trianguloSVG');
    svg.innerHTML = ''; // Limpiar SVG previo

    // Coordenadas para dibujar el triángulo
    const height = 400;
    const width = 400;

    const x1 = 50, y1 = 350; // Primer vértice del triángulo (Punto A)
    const x2 = x1 + ladoC;   // Segundo vértice (Punto B) en la misma línea horizontal
    const y2 = y1;           // Misma altura en y (para que el lado C esté horizontal)

    // Calculamos el tercer vértice (Punto C) usando trigonometría
    const anguloA = calcularAngulo(ladoB, ladoC, ladoA) * (Math.PI / 180); // Convertimos a radianes
    const x3 = x1 + ladoB * Math.cos(anguloA);
    const y3 = y1 - ladoB * Math.sin(anguloA);

    // Dibujamos el triángulo con el elemento <polygon> en SVG
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("stroke-width", "2");
    polygon.setAttribute("fill", "lightblue");

    svg.appendChild(polygon);
}
