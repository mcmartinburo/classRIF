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

/*************************************************
 * GENERAR TABLA DE ENTRADA
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
      <input type="number" min="0" max="1" step="1" id="resp-${index}">
    </td>
  `;
  tbody.appendChild(row);
});

/*************************************************
 * PROCESAR RESULTADOS
 *************************************************/
let chart = null;

function procesar() {
  const resultados = { "nrp":0, "rp-":0, "rp+":0 };
  const totalItems = { "nrp":0, "rp-":0, "rp+":0 };

  // Contar aciertos y total por condición
  items.forEach((item, index) => {
    const valor = Number(document.getElementById(`resp-${index}`).value);
    if (valor !== 0 && valor !== 1) {
      alert("Todas las casillas deben contener únicamente 0 o 1.");
      throw new Error("Entrada inválida");
    }

    totalItems[item.condicion]++;
    if (valor === 1) resultados[item.condicion]++;
  });

  // Determinar condición predominante
  const condicionFinal = Object.keys(resultados).reduce((a,b) => resultados[a]>=resultados[b]?a:b);
  document.getElementById("condicionFinal").innerText = "Condición predominante: " + condicionFinal;

  dibujarGrafica(resultados, totalItems);
  generarTablaResultados(resultados, totalItems);
}

/*************************************************
 * DIBUJAR GRÁFICA SOBRE PORCENTAJES
 *************************************************/
function dibujarGrafica(resultados, totalItems) {
  const ctx = document.getElementById("grafica").getContext("2d");
  if(chart) chart.destroy();

  const etiquetas = ["Practicados", "No practicados", "Relacionados pero NP"];
  const colores = ["green","red","blue"];
  const data = [
    Math.round((resultados["rp+"]/totalItems["rp+"])*100),
    Math.round((resultados["rp-"]/totalItems["rp-"])*100),
    Math.round((resultados["nrp"]/totalItems["nrp"])*100)
  ];

  chart = new Chart(ctx, {
    type:"bar",
    data:{
      labels: etiquetas,
      datasets:[{
        label:"% Recuerdo",
        data: data,
        backgroundColor: colores
      }]
    },
    options:{
      responsive:true,
      scales:{
        y:{ beginAtZero:true, max:100, ticks:{ stepSize:10 } }
      }
    }
  });
}

/*************************************************
 * GENERAR TABLA DE RESULTADOS
 *************************************************/
function generarTablaResultados(resultados, totalItems) {
  const tbodyRes = document.getElementById("tabla-resultados").querySelector("tbody");
  tbodyRes.innerHTML = "";

  const nombresCondicion = { "rp+":"Practicados", "rp-":"No practicados", "nrp":"Relacionados pero NP" };

  ["rp+","rp-","nrp"].forEach(c => {
    const porcentaje = Math.round((resultados[c]/totalItems[c])*100);
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${nombresCondicion[c]}</td>
      <td>${porcentaje}%</td>
      <td>${resultados[c]}</td>
    `;
    tbodyRes.appendChild(fila);
  });
}

  const nombresCondicion = { "rp+":"Practicados", "rp-":"No practicados", "nrp":"Relacionados pero NP" };

  ["r]()
