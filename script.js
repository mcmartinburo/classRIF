// Definición de ítems por condición (extraído del Excel)
const condiciones = {
  "nrp": [0,2,4,6,8,10,12,14,16,18,20,22],
  "rp-": [1,3,5,7,9,11,13,15,17,19,21,23],
  "rp+": [24,25,26,27,28,29,30,31,32,33,34,35]
};

let chart = null;

function procesar() {
  const input = document.getElementById("respuestas").value;

  // Convertir entrada en array de números
  const respuestas = input.split(",").map(n => Number(n.trim()));

  // Validación básica
  if (respuestas.length !== 36 || respuestas.some(n => n !== 0 && n !== 1)) {
    alert("Debes introducir exactamente 36 valores, solo 1 y 0.");
    return;
  }

  const resultados = calcularAciertos(respuestas);
  const condicionFinal = obtenerCondicionFinal(resultados);

  document.getElementById("condicionFinal").innerText =
    "Condición predominante: " + condicionFinal;

  dibujarGrafica(resultados);
}

function calcularAciertos(respuestas) {
  const resultados = { "nrp": 0, "rp-": 0, "rp+": 0 };

  for (let condicion in condiciones) {
    condiciones[condicion].forEach(indice => {
      if (respuestas[indice] === 1) {
        resultados[condicion]++;
      }
    });
  }

  return resultados;
}

function obtenerCondicionFinal(resultados) {
  return Object.keys(resultados).reduce((a, b) =>
    resultados[a] >= resultados[b] ? a : b
  );
}

function dibujarGrafica(resultados) {
  const ctx = document.getElementById("grafica").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["nrp", "rp-", "rp+"],
      datasets: [{
        label: "Número de aciertos",
        data: [
          resultados["nrp"],
          resultados["rp-"],
          resultados["rp+"]
        ]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
}
