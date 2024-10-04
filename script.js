document.addEventListener('DOMContentLoaded', () => {
    const tablaCuerpo = document.querySelector('#tablaEstudiantes tbody');
    const agregarBtn = document.querySelector('#agregarBtn');
    const buscarBtn = document.querySelector('#buscarBtn');
    const buscarInput = document.querySelector('#buscarInput');

    // Función para añadir una fila
    function agregarFila(nombre, apellido, matricula, nota) {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${matricula}</td>
            <td>${nota}</td>
            <td>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </td>
        `;

        // Añadir eventos a los botones
        fila.querySelector('.editar').addEventListener('click', () => editarFila(fila));
        fila.querySelector('.eliminar').addEventListener('click', () => eliminarFila(fila));

        tablaCuerpo.appendChild(fila);
    }

    // Función para editar una fila
    function editarFila(fila) {
        const celdas = fila.getElementsByTagName('td');
        if (fila.isContentEditable) {
            fila.contentEditable = 'false';
            celdas[4].querySelector('.editar').textContent = 'Editar';
        } else {
            fila.contentEditable = 'true';
            celdas[4].querySelector('.editar').textContent = 'Guardar';
        }
    }

    // Función para eliminar una fila
    function eliminarFila(fila) {
        tablaCuerpo.removeChild(fila);
    }

    // Función para buscar filas
    function buscarFilas() {
        const terminoBusqueda = buscarInput.value.toLowerCase();
        const filas = tablaCuerpo.getElementsByTagName('tr');

        Array.from(filas).forEach(fila => {
            const celdas = fila.getElementsByTagName('td');
            let coincide = false;

            Array.from(celdas).forEach(celda => {
                if (celda.textContent.toLowerCase().includes(terminoBusqueda)) {
                    coincide = true;
                }
            });

            fila.style.display = coincide ? '' : 'none';
        });
    }

    // Evento para añadir una nueva fila
    agregarBtn.addEventListener('click', () => {
        const nombre = document.querySelector('#nombreInput').value;
        const apellido = document.querySelector('#apellidoInput').value;
        const matricula = document.querySelector('#matriculaInput').value;
        const nota = document.querySelector('#notaInput').value;

        if (nombre && apellido && matricula && nota) {
            agregarFila(nombre, apellido, matricula, nota);
            document.querySelector('#nombreInput').value = '';
            document.querySelector('#apellidoInput').value = '';
            document.querySelector('#matriculaInput').value = '';
            document.querySelector('#notaInput').value = '';
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    // Evento para buscar filas
    buscarBtn.addEventListener('click', buscarFilas);

    
});
