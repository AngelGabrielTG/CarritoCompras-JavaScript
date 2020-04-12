/* V A R I A B L E S */
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN = document.getElementById('vaciar-carrito');

/* L I S T E N E R */
cargarEventListener();

function cargarEventListener(){
    //DISPARA CUANDO SE PRESIONA "AGREGAR CARRITO"
    cursos.addEventListener('click', compraCurso);

    //DISPARA CUANDO SE ELIMINA UN CURSO DEL CARRITO
    carrito.addEventListener('click', eliminarCurso);

    //DISPARA CUANDO SE PRESIONA VACIAR CARRITO
    vaciarCarritoBTN.addEventListener('click', vaciarCarrito);

    //AL CARGAR DOCUMENTO, MOSTRAR LOCAL STORAGE
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


/* F U N C I O N E S*/
//FUNCION QUE AÑADE EL CURSO AL CARRITO
function compraCurso(e){
    e.preventDefault();

    //LISTA DE CLASES SOLO CUANDO DE AGREGAR CARRITO
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;

        //ENVIAR EL CURSO SELECCIONADO OBTENER INFORMACION
        leerDatosCurso(curso);
    }
}

//LEE DATOS DEL CURSO
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

//MUESTRA EL CURSO SELECCIONADO EN EL CARRITO
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);
}

//ELIMINANDO CURSO DEL CARRITO EN EL DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoID;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoID);
}

//ELIMINA CURSOS DEL CARRITO EN EL DOM
function vaciarCarrito(e) {
    //FORMA LENTA
    //listaCursos.innerHTML = '';

    //FORMA RAPIDA
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    //VACIAR LOCAL STORAGE
    vaciarLocalStorage();

    return false;
}

//ALMACENAR CURSOS EN EL CARRITO A LOCAL STORAGE
function guardarCursoLocalStorage(curso) {
    let cursos;

    //TOMA EL VALOR DEL ARREGLO DE LS O VACIO
    cursos = obtenerCursoLocalStorage();

    //EL CURSO SELECCIONADO SE AGREGA AL ARREGLO
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//COMPROBAMOS QUE HAYA ELEMENTOS EN EL LOCAL STORAGE
function obtenerCursoLocalStorage() {
    let cursosLS;
    //COMPROBAMOS SI HAY ALGO EN EL LOCAL STORAGE
    if(localStorage.getItem('cursos') === null) {
        //SI AL RETORNARLOS ES IGUAL A NULL ES UN ARREGLO VACIO
        cursosLS = [];
    } else {
        //PARA GUARDAR COMO ARREGLO USAMOS EL JSON
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//IMPRIME CURSOS DEL LS EN EL CARRITO
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursoLocalStorage();

    cursosLS.forEach(function(curso) {
        //CONSTRUIR EL TEMPLATE
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
    `;
    listaCursos.appendChild(row);
    });
}

//ELIMINAR CURSO POR ID EN EL LOCAL STORAGE
function eliminarCursoLocalStorage(curso) {
    let cursosLS;

    //OBTENEMOS EL ARREGLO DE CURSOS
    cursosLS = obtenerCursoLocalStorage();

    // COMPARAMOS EL ID DEL CURSO CON LOS DEL LS
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });

    //AÑADIMOS EL ARREGLO ACTUAL A STORAGE
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//ELIMINA TODOS LOS CURSOS DEL LS
function vaciarLocalStorage() {
    localStorage.clear();
}