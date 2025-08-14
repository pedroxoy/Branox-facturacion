let numeroCotizacion = parseInt(localStorage.getItem("numeroCotizacion")) || 1;

function generarFactura() {
  const nombre = document.getElementById("nombre").value;
  const nit = document.getElementById("nit").value;
  const direccion = document.getElementById("direccion").value;
  const fecha = new Date().toLocaleDateString("es-GT");

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

  if (productosHTML.trim() === "") {
    alert("Por favor ingresa al menos un producto válido.");
    return;
  }

  const facturaHTML = `
    <div class="encabezado">
      <img src="logo-branox.png" alt="Logo" style="height:80px;">
      <div class="empresa">
        <p>NIT: 103035346</p>
        <p>Zona 7, Residenciales Imperial, Cobán A.V.</p>
        <p>Tel: 3809 9190</p>
      </div>
    </div>

    <h2 style="text-align:center; margin-bottom:20px;">Factura No. ${numeroFormateado}</h2>

    <p><strong>Fecha:</strong> ${fecha}</p>

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

  numeroCotizacion++;
  localStorage.setItem("numeroCotizacion", numeroCotizacion);
}

function descargarImagen() {
  html2canvas(document.getElementById("factura-final")).then(canvas => {
    const link = document.createElement("a");
    link.download = "cotizacion-branox.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function reiniciarNumeracion() {
 if (confirm("¿Reiniciar numeración de factura?")) {
  numeroCotizacion = 1;
  localStorage.setItem("numeroCotizacion", numeroCotizacion);
  document.getElementById("titulo-factura").textContent = "Factura";
  alert("Numeración reiniciada.");
}
  }
