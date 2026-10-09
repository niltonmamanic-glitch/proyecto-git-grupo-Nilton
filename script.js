/* NovaMarket | Funcionalidades elaboradas por el Integrante C */
document.addEventListener('DOMContentLoaded', () => {
  const buscador = document.querySelector('#buscador');
  const botonesFiltro = document.querySelectorAll('[data-filtro]');
  const productos = Array.from(document.querySelectorAll('.product-card'));
  const contadorResultados = document.querySelector('#contador-resultados');
  const sinResultados = document.querySelector('#sin-resultados');
  const contadorCarrito = document.querySelector('#cantidad-carrito');
  const formulario = document.querySelector('#formulario-contacto');
  const respuesta = document.querySelector('#respuesta-formulario');

  let filtroActivo = 'todos';
  let cantidadCarrito = 0;

  // Función 1: búsqueda de productos en tiempo real.
  // Función 2: filtros por categoría (se combinan con la búsqueda).
  function actualizarCatalogo() {
    const texto = buscador.value.trim().toLocaleLowerCase('es');
    let visibles = 0;

    productos.forEach((producto) => {
      const nombre = producto.dataset.nombre.toLocaleLowerCase('es');
      const categoria = producto.dataset.categoria;
      const coincideTexto = nombre.includes(texto);
      const coincideCategoria = filtroActivo === 'todos' || categoria === filtroActivo;
      const mostrar = coincideTexto && coincideCategoria;

      producto.hidden = !mostrar;
      if (mostrar) visibles += 1;
    });

    contadorResultados.textContent = String(visibles);
    sinResultados.hidden = visibles !== 0;
  }

  buscador.addEventListener('input', actualizarCatalogo);

  botonesFiltro.forEach((boton) => {
    boton.addEventListener('click', () => {
      filtroActivo = boton.dataset.filtro;
      botonesFiltro.forEach((b) => {
        const activo = b === boton;
        b.classList.toggle('is-active', activo);
        b.setAttribute('aria-pressed', String(activo));
      });
      actualizarCatalogo();
    });
  });

  // Función 3: contador de productos agregados (sin compras reales).
  document.querySelectorAll('.add-button').forEach((boton) => {
    boton.addEventListener('click', () => {
      cantidadCarrito += 1;
      contadorCarrito.value = String(cantidadCarrito);
      contadorCarrito.textContent = String(cantidadCarrito);
      boton.classList.add('added');
      boton.textContent = '¡Agregado!';
    });
  });

  // Función 4: validación de formulario. No se envían ni guardan datos.
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nombre = formulario.elements.nombre.value.trim();
    const correo = formulario.elements.correo.value.trim();
    const mensaje = formulario.elements.mensaje.value.trim();
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    let error = '';

    if (nombre.length < 3) error = 'Escribe un nombre de al menos 3 caracteres.';
    else if (!correoValido) error = 'Escribe un correo electrónico válido.';
    else if (mensaje.length < 10) error = 'El mensaje debe tener al menos 10 caracteres.';

    if (error) {
      respuesta.textContent = error;
      respuesta.className = 'form-feedback error';
      return;
    }

    respuesta.textContent = `¡Gracias, ${nombre}! Datos validados correctamente. Es una demostración: no se envió ningún mensaje.`;
    respuesta.className = 'form-feedback success';
    formulario.reset();
  });

  actualizarCatalogo();
});
