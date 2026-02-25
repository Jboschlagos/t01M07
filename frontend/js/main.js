// Función para cargar finanzas
async function cargarFinanzas() {
    const mensajeDiv = document.getElementById('mensaje-finanzas');
    const tbody = document.getElementById('tabla-finanzas');
    
    try {
        const response = await fetch('http://localhost:3000/finanzas');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const data = await response.json();
        mensajeDiv.innerHTML = '';
        tbody.innerHTML = '';
        
        if (data.length === 0) {
            mensajeDiv.innerHTML = '<div class="alert alert-info">No hay registros.</div>';
            return;
        }
        
        data.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${item.id}</td>
                <td>${item.fecha}</td>
                <td>${item.descripcion}</td>
                <td>${item.categoria || '-'}</td>
                <td>$${parseFloat(item.monto).toFixed(2)}</td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        mensajeDiv.innerHTML = `<div class="alert alert-danger">Error al cargar finanzas: ${error.message}</div>`;
    }
}

// Función para cargar clientes
async function cargarClientes() {
    const mensajeDiv = document.getElementById('mensaje-clientes');
    const container = document.getElementById('clientes-container');
    
    try {
        const response = await fetch('http://localhost:3000/clientes');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const data = await response.json();
        mensajeDiv.innerHTML = '';
        container.innerHTML = '';
        
        if (data.length === 0) {
            mensajeDiv.innerHTML = '<div class="alert alert-info">No hay clientes.</div>';
            return;
        }
        
        data.forEach(cliente => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title" style="color: #003366;">${cliente.nombre}</h5>
                        <p class="card-text">
                            <strong>Email:</strong> ${cliente.email}<br>
                            <strong>Teléfono:</strong> ${cliente.telefono || 'No especificado'}<br>
                            <strong>Registro:</strong> ${cliente.fecha_registro}
                        </p>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    } catch (error) {
        mensajeDiv.innerHTML = `<div class="alert alert-danger">Error al cargar clientes: ${error.message}</div>`;
    }
}

// Ejecutar cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    cargarFinanzas();
    cargarClientes();
});
