// Función principal para generar la factura
function generarFactura() {
  const nombre = document.getElementById("nombre").value;
  const nit = document.getElementById("nit").value;
  const direccion = document.getElementById("direccion").value;

  const filas = document.querySelectorAll("#tabla-productos tbody tr");
  let productosHTML = "";
  let totalGeneral = 0;

  filas.forEach(fila => {
    const producto = fila.children[0].children[0].value;
    const cantidad = parseFloat(fila.children[1].children[0].value);
    const precio = parseFloat(fila.children[2].children[0].value);
    if (!producto || isNaN(cantidad) || isNaN(precio)) return;

    const total = cantidad * precio;
    totalGeneral += total;

    productosHTML += `
      <tr>
        <td>${producto}</td>
        <td>${cantidad}</td>
        <td>Q${precio.toFixed(2)}</td>
        <td>Q${total.toFixed(2)}</td>
      </tr>
    `;
  });

  const facturaHTML = `
    <div class="encabezado">
      <img src="logo-branox.png" alt="Branox">
      <div class="empresa">
        <h1>Branox</h1>
        <p>NIT: 103035346</p>
        <p>Zona 7, Residenciales Imperial, Cobán A.V.</p>
        <p>Tel: 3809 9190</p>
      </div>
    </div>

    <div class="datos-cliente">
      <h2>Datos del Cliente</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>NIT:</strong> ${nit}</p>
      <p><strong>Dirección:</strong> ${direccion}</p>
    </div>

    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${productosHTML}
      </tbody>
    </table>

    <h3 style="text-align:right; margin-top:20px;">Total General: Q${totalGeneral.toFixed(2)}</h3>
  `;

  const contenedor = document.getElementById("factura-final");
  contenedor.innerHTML = facturaHTML;
  contenedor.classList.remove("factura-oculta");

  document.getElementById("acciones-finales").classList.remove("factura-oculta");
}

// Función para descargar la factura como imagen PNG
function descargarImagen() {
  html2canvas(document.getElementById("factura-final")).then(canvas => {
    const link = document.createElement("a");
    link.download = "factura-branox.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

// (Opcional) Función para descargar como PDF – se puede agregar con jsPDF
// function descargarPDF() {
//   const factura = document.getElementById("factura-final");
//   const doc = new jsPDF();
//   doc.html(factura, {
//     callback: function (doc) {
//       doc.save("factura-branox.pdf");
//     },
//     x: 10,
//     y: 10
//   });
// }

