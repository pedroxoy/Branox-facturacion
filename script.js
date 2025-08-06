function agregarFila() {
  const tabla = document.querySelector("#tabla-productos tbody");
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td><input type="text" value=""></td>
    <td><input type="number" value="1"></td>
    <td><input type="number" value="0"></td>
    <td class="total">Q0.00</td>
  `;
  tabla.appendChild(fila);
}

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
    const total = cantidad * precio;
    totalGeneral += total;
    fila.children[3].textContent = `Q${total.toFixed(2)}`;

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
    <div id="factura">
      <h2>Factura Branox</h2>
      <p><strong>Cliente:</strong> ${nombre}</p>
      <p><strong>NIT:</strong> ${nit}</p>
      <p><strong>Dirección:</strong> ${direccion}</p>
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
      <h3>Total General: Q${totalGeneral.toFixed(2)}</h3>
    </div>
  `;

  const contenedor = document.getElementById("factura-generada");
  contenedor.innerHTML = facturaHTML;
  contenedor.classList.remove("factura-oculta");
}

function descargarPDF() {
  const factura = document.getElementById("factura");
  html2pdf().from(factura).save("factura-branox.pdf");
}

function descargarImagen() {
  const factura = document.getElementById("factura");
  html2canvas(document.querySelector("#factura")).then(canvas => {
  const link = document.createElement("a");
  link.download = "factura-branox.png";
  link.href = canvas.toDataURL();
  link.click();
});
}
