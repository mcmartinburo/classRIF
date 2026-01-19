/*************************************************
 * DEFINICIÓN DE LOS ÍTEMS (36)
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

let chart = null;

/*************************************************
 * GENERAR TABLA DE ÍTEMS
 *************************************************/
function renderizarTablaItems() {
  const tbody = document.getElementById("tabla-items");
  if (!tbody) return;

  tbody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.categoria}</td>
      <td>${item.objetivo}</td>
      <td>${item.condicion}</td>
      <td>
        <input type="number" min="0" max="1" step="1" id="resp-${index}" value="0">
      </td>
    `;
    tbody.appendChild(row);
  });
}

/*************************************************
 * PROCESAR RESULTADOS
 *************************************************/
function procesar() {
  const resultados = { "nrp": 0, "rp-": 0, "rp+": 0 };
  const totalItems = { "nrp": 0, "rp-": 0, "rp+": 0 };

  items.forEach((item, index) => {
    const input = document.getElementById(`resp-${index}`);
    const valor = Number(input.value);
    
    totalItems[item.condicion]++;
    if (valor === 1) resultados[item.condicion]++;
  });

  // Condición predominante
  const nombres = { "rp+": "Practicados", "rp-": "No Practicados", "nrp": "Relacionados (NRP)" };
  const porcentajes = {
    "rp+": (resultados["rp+"] / totalItems["rp+"]) * 100,
    "rp-": (resultados["rp-"] / totalItems["rp-"]) * 100,
    "nrp": (resultados["nrp"] / totalItems["nrp"]) * 100
  };

  const mejor = Object.keys(porcentajes).reduce((a, b) => porcentajes[a] >= porcentajes[b] ? a : b);
  document.getElementById("condicionFinal").innerText = "Condición predominante: " + nombres[mejor];

  generarTablaResultados(resultados, totalItems);
  function dibujarGrafica(resultados, totalItems) {
  const ctx = document.getElementById("grafica").getContext("2d");
  if (chart) chart.destroy();

  const dataValues = [
    Math.round((resultados["rp+"] / totalItems["rp+"]) * 100) || 0,
    Math.round((resultados["rp-"] / totalItems["rp-"]) * 100) || 0,
    Math.round((resultados["nrp"] / totalItems["nrp"]) * 100) || 0
  ];

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Practicados (RP+)", "No practicados (RP-)", "Relacionados (NRP)"],
      datasets: [{
        label: "% de recuerdo",
        data: dataValues,
        backgroundColor: ["#2ecc71", "#e74c3c", "#3498db"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // CLAVE: Permite que se estire según el CSS
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 10,
            // CLAVE: Añade el símbolo % al eje Y
            callback: function(value) {
              return value + "%";
            }
          },
          title: {
            display: true,
            text: 'Porcentaje de Recuerdo',
            font: { weight: 'bold' }
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function generarTablaResultados(resultados, totalItems) {
  const tbodyRes = document.querySelector("#tabla-resultados tbody");
  tbodyRes.innerHTML = "";
  const nombres = { "rp+": "Practicados", "rp-": "No practicados", "nrp": "Relacionados" };

  ["rp+", "rp-", "nrp"].forEach(c => {
    const porc = Math.round((resultados[c] / totalItems[c]) * 100) || 0;
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${nombres[c]}</td><td>${porc}%</td><td>${resultados[c]}</td>`;
    tbodyRes.appendChild(fila);
  });
}

function dibujarGrafica(resultados, totalItems) {
  const ctx = document.getElementById("grafica").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Practicados", "No practicados", "Relacionados"],
      datasets: [{
        label: "% de recuerdo",
        data: [
          (resultados["rp+"]/totalItems["rp+"])*100,
          (resultados["rp-"]/totalItems["rp-"])*100,
          (resultados["nrp"]/totalItems["nrp"])*100
        ],
        backgroundColor: ["#2ecc71", "#e74c3c", "#3498db"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Esto permite que se estire a lo ancho sin crecer en alto
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 10
          }
        }
      },
      plugins: {
        legend: {
          display: false // Opcional: quita la leyenda si quieres más espacio
        }
      }
    }
  });
}

// Iniciar al cargar
document.addEventListener("DOMContentLoaded", renderizarTablaItems);
