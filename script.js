// Añade esta línea al principio de todo tu script.js para verificar que carga
console.log("Script cargado correctamente");

function renderizarTablaItems() {
    const tbody = document.getElementById("tabla-items");
    
    // Si no encuentra el elemento, lo buscamos de nuevo tras un pequeño retraso
    if (!tbody) {
        console.warn("No se encontró tabla-items, reintentando...");
        setTimeout(renderizarTablaItems, 100); 
        return;
    }

    tbody.innerHTML = ""; 
    items.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.categoria}</td>
            <td>${item.objetivo}</td>
            <td><strong>${item.condicion.toUpperCase()}</strong></td>
            <td>
                <input type="number" min="0" max="1" value="0" id="resp-${index}">
            </td>
        `;
        tbody.appendChild(row);
    });
    console.log("Tabla renderizada con éxito");
}

// Cambia la última línea por esta
window.onload = renderizarTablaItems;

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
  {id:30, categoria:"DEPORTE", objetivo:"natación", condicion:"rp+"
    }
  });
}
