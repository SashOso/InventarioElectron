async function Listar() {
    const data=await Entrada.Lista();
    //------filtro-----------//
    const busqueda=document.getElementById("busqueda").value.trim();
    const data_filtrado=data.filter(item=>
        item.articulo.codigo.toLowerCase().includes(busqueda.toLowerCase())||
        item.articulo.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.articulo.unidad_medida.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    //-----------------------//
    let content="";
    data_filtrado.forEach((row,index) => {
        content+=`
            <tr>
                <td>${FormatoFecha(row.fecha)}</td>
                <td>${row.articulo.codigo}</td>
                <td>${row.articulo.descripcion}</td>
                <td>${row.articulo.unidad_medida.nombre}</td>
                <td>${row.cantidad}</td>
                <td>${FormatoSoles(row.costo_unitario)}</td>
                <td>${FormatoSoles(row.cantidad*row.costo_unitario)}</td>
                <td>${row.observacion}</td>
                <td>
                    <button class="btn-editar" onclick="Editar(${row.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-eliminar" onclick="Eliminar(${row.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
    });
    document.querySelector("tbody").innerHTML=content;
}
async function Nuevo(){
    const{ value: value } =await Swal.fire({
        position: "center",
        title: "Registrar nuevo",
        showCancelButton: true,
        showCloseButton: true,
        html: `
        <div class="formulario">
            <label for="nombre">Nombre: <span style="color: red;">(*)</span></label>
            <input id="nombre" type="text" class="swal2-input" placeholder="Nombre">
        </div>
        `,

        preConfirm:async () => {
            const input_nombre=document.getElementById('nombre');
            input_nombre.value=input_nombre.value.trim().toUpperCase();
            let nombre = input_nombre.value

            if (!nombre) {
                Swal.showValidationMessage('Por favor, complete todos los campos obligatorios');
                return false;
            }
            return { nombre };
        }
    })

    if (value) {
        const respuesta=await FuenteIngreso.Agregar(value);
        if(respuesta){
            Listar()
            Swal.fire({
                icon: 'success',
                title: 'Agregado!',
                text: 'Agregado correctamente.',
                timer: 3000,
                showCloseButton: true,
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al intentar agregar.',
                timer: 3000,
                showCloseButton: true,
            });
        }
    }
}
async function Editar(id){
    const obj=await FuenteIngreso.Buscar(id)

    const{ value: value } =await Swal.fire({
        position: "center",
        title: "Editar Fuente de Ingreso",
        showCancelButton: true,
        showCloseButton: true,
        html: `
        <div class="formulario">
            <label for="nombre">Nombre: <span style="color: red;">(*)</span></label>
            <input id="nombre" value="${obj.nombre}" type="text" class="swal2-input" placeholder="Nombre">
        </div>
        `,

        preConfirm:async () => {
            const input_nombre=document.getElementById('nombre');
            input_nombre.value=input_nombre.value.trim().toUpperCase();
            let nombre = input_nombre.value

            if (!nombre) {
                Swal.showValidationMessage('Por favor, complete todos los campos obligatorios');
                return false;
            }
            return { id,nombre };
        }
    });

    if (value) {
        const respuesta=await FuenteIngreso.Editar(value);
        if(respuesta){
            Listar()
            Swal.fire({
                icon: 'success',
                title: 'Editado!',
                text: 'Editado correctamente.',
                timer: 3000,
                showCloseButton: true,
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al intentar edtar.',
                timer: 3000,
                showCloseButton: true,
            });
        }
    }
}
async function Eliminar(id){
    const obj = await FuenteIngreso.Buscar(id);

    const { value } = await Swal.fire({
        position: "center",
        title: "¿Deseas eliminar esta fuente ingreso?",
        text: `Fuente de ingreso: ${obj.nombre}.`,
        icon: "warning",
        showCancelButton: true,
        showCloseButton: true,
    });

    if (value) {
        const respuesta=await FuenteIngreso.Eliminar(id);
        if(respuesta){
            Listar()
            Swal.fire({
                icon: 'success',
                title: '¡Eliminado!',
                text: 'Eliminado correctamente.',
                timer: 3000,
                showCloseButton: true,
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al intentar eliminar.',
                timer: 3000,
                showCloseButton: true,
            });
        }
    }
}