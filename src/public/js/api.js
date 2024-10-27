function CrearApi(endpoint) {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}${endpoint}`;

    return {
        async Lista() {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener la lista');
            }
            return response.json();
        },

        async Agregar(obj) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el registro');
            }
            return response.json();
        },

        async Buscar(id) {
            const response = await fetch(`${url}/${id}`);
            if (!response.ok) {
                throw new Error('Error al buscar el registro');
            }
            return response.json();
        },

        async Eliminar(id) {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el registro');
            }
            return response.ok;
        },

        async Editar(obj) {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            if (!response.ok) {
                throw new Error('Error al editar el registro');
            }
            return response.json();
        }
    };
}

// Crear instancias de la API
const UnidadMedida = CrearApi("/api/unidad-medida");
const Articulo = CrearApi("/api/articulo");
const Entrada = CrearApi("/api/entrada");
const Salida = CrearApi("/api/salida");
const Inventario = CrearApi("/api/inventario");
