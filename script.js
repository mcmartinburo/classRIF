/*************************************************
 * DEFINICIÓN DE LOS ÍTEMS (36)
 * Equivalente exacto a la tabla del Excel
 *************************************************/

const items = [
  {id:1, categoria:"ESPECIAS", objetivo:"canela", condicion:"nrp"},
  {id:2, categoria:"ANIMALES", objetivo:"caballo", condicion:"rp-"},
  {id:3, categoria:"MÚSICA", objetivo:"guitarra", condicion:"nrp"},
  {id:4, categoria:"PROFESIONES", objetivo:"bombero", condicion:"rp-"},
  {id:5, categoria:"ESPECIAS", objetivo:"azafrán", condicion:"nrp"},
  {id:6, categoria:"ANIMALES", objetivo:"tiburón", condicion:"rp-"},
  {id:7, categoria:"INSTRUMENTOS", objetivo:"flauta", condicion:"nrp"},
  {id:8, categoria:"ANIMALES", objetivo:"vaca", condicion:"rp-"},
  {id:9, categoria:"ESPECIAS", objetivo:"perejil", condicion:"nrp"},
  {id:10, categoria:"PROFESIONES", objetivo:"cocinero", condicion:"rp-"},
  {id:11, categoria:"INSTRUMENTOS", objetivo:"tambor", condicion:"nrp"},
  {id:12, categoria:"DEPORTE", objetivo:"ciclismo", condicion:"rp-"},
  {id:13, categoria:"ESPECIAS", objetivo:"romero", condicion:"nrp"},
  {id:14, categoria:"FRUTAS", objetivo:"banana", condicion:"rp-"},
  {id:15, categoria:"INSTRUMENTOS", objetivo:"violín", condicion:"nrp"},
  {id:16, categoria:"DEPORTE", objetivo:"atletismo", condicion:"rp-"},
  {id:17, categoria:"ESPECIAS", objetivo:"tomillo", condicion:"nrp"},
  {id:18, categoria:"FRUTAS", objetivo:"limón", condicion:"rp-"},
  {id:19, categoria:"INSTRUMENTOS", objetivo:"saxofón", condicion:"nrp"},
  {id:20, categoria:"PROFESIONES", objetivo:"fontanero", condicion:"rp-"},
  {id:21, categoria:"ESPECIAS", objetivo:"orégano", condicion:"nrp"},
  {id:22, categoria:"DEPORTE", objetivo:"patinaje", condicion:"rp-"},
  {id:23, categoria:"INSTRUMENTOS", objetivo:"clarinete", condicion:"nrp"},
  {id:24, categoria:"FRUTAS", objetivo:"melón", condicion:"rp-"},
  {id:25, categoria:"DEPORTE", objetivo:"boxeo", condicion:"rp+"},
  {id:26, categoria:"FRUTAS", objetivo:"naranja", condicion:"rp+"},
  {id:27, categoria:"DEPORTE", objetivo:"tenis", condicion:"rp+"},
  {id:28, categoria:"FRUTAS", objetivo:"fresa", condicion:"rp+"},
  {id:29, categoria:"PROFESIONES", objetivo:"dentista", condicion:"rp+"},
  {id:30, categoria:"DEPORTE", objetivo:"natación", condicion:"rp+"},
  {id:31, categoria:"FRUTAS", objetivo:"piña", condicion:"rp+"},
  {id:32, categoria:"ANIMALES", objetivo:"burro", condicion:"rp+"},
  {id:33, categoria:"PROFESIONES", objetivo:"veterinario", condicion:"rp+"},
  {id:34, categoria:"ANIMALES", objetivo:"paloma", condicion:"rp+"},
  {id:35, categoria:"ANIMALES", objetivo:"oveja", condicion:"rp+"},
  {id:36, categoria:"PROFESIONES", objetivo:"jardinero", condicion:"rp+"}
];

/*************************************************
 * GENERACIÓN AUTOMÁTICA DE LA TABLA
 *************************************************/

const tbody = document.getElementById("tabla-items");

items.forEach((item, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.id}</td>
    <td>${item.categoria}</td>
    <td>${item.objetivo}</td>
    <td>${item.condicion}</td>
    <td>
      <input 
        type="number" 
        min="0" 
        max="1" 
        step="1"
        id="resp-${index}"
      >
    </td>
  `;
  tbody.appendChild(row);
});

/*************************************************
 * PROCESAMIENTO DE RESULTADOS
 *************************************************/

let chart = null;

function procesar() {
  const resultados = {
    "nrp": 0,
    "rp-": 0,
    "rp+": 0
  };

  // Validación y conteo
  for (let i = 0; i < items.length; i++) {
    const valor = Number(document.getElementById(`resp-${i}`).value);

    if (valor !== 0 && valor !== 1) {
      alert("Todas las casillas deben contener únicamente 0 o 1.");
      return;
    }

    if (valor === 1) {
      resultados[items[i].condicion]++;
    }
  }

  // Determinar condición predominante
  const condicionFinal = Object.keys(resultados).reduce((a, b) =>
    resultados[a] >= resultados[b] ? a : b
  );

  document.getElementById("condicionFinal").innerText =
    "Condición predominante: " + condicionFinal;

  dibujarGrafica(resultados);
}

/*************************************************
 * GRÁFICA DE BARRAS (Chart.js)
 *************************************************/

function dibujarGrafica(resultados) {
  const ctx = document.getElementById("grafica").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  // Datos para la gráfica
  const etiquetas = ["nrp", "rp-", "rp+"];
  const colores = ["blue", "red", "green"]; // NRP azul, RP- rojo, RP+ verde
  const datos = [resultados["nrp"], resultados["rp-"], resultados["rp+"]];

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Número de aciertos",
        data: datos,
        backgroundColor: colores
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });

  // Generar tabla de resultados
  const tabla = document.getElementById("tabla-resultados").querySelector("tbody");
  tabla.innerHTML = ""; // Limpiar tabla anterior

  // Total de ítems por condición
  const totalItems = {
    "nrp": items.filter(i => i.condicion === "nrp").length,
    "rp-": items.filter(i => i.condicion === "rp-").length,
    "rp+": items.filter(i => i.condicion === "rp+").length
  };

  const nombresCondicion = {
    "nrp": "Relacionados pero NP",
    "rp-": "No practicados",
    "rp+": "Practicados"
  };

  ["rp+", "rp-", "nrp"].forEach(c => {
    const porcentaje = Math.round((resultados[c] / totalItems[c]) * 100);
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${nombresCondicion[c]}</td>
      <td>${porcentaje}%</td>
      <td>${resultados[c]}</td>
    `;
    tabla.appendChild(fila);
  });
}
