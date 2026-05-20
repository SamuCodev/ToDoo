let tareas = JSON.parse(localStorage.getItem("tareas")) || []
//Modal
let btnAbrirModal = document.querySelector(".btn-agg")
let btnCerrarModal = document.querySelector(".btn-cerrar-modal")
let btnAgregarTarea = document.querySelector(".btn-agg-modal")
let modalOculto = document.querySelector(".modal")
//Inputs Modal
let titleTarea = document.querySelector(".title-tarea-modal")
let descTarea = document.querySelector(".desc-tarea-modal")
let timeTarea = document.querySelector(".time-tarea-modal")
//filtros
let btnTodos = document.querySelector(".btn-todos")
let btnCompletados = document.querySelector(".btn-completed")
let btnNoCompletados = document.querySelector(".btn-incompleted")

//Funcion que crea y actualiza las tareas actuales
const crearTarea = (listaTareas) => {
    let SeccionTareas = document.querySelector(".tareas")
    SeccionTareas.innerHTML = ""

    listaTareas.forEach(tarea => {
        let articleTarea = document.createElement("article")
        articleTarea.dataset.idTarea = tarea.id
        articleTarea.classList.add("tarea")

        articleTarea.innerHTML = `
        <time datetime="${tarea.hora}" class="time">${tarea.hora}</time>
        <h4 class="title-tarea">${tarea.titulo}</h4>
        <p class="desc">${tarea.descripcion}</p>
        <button class="btn-del">Borrar tarea</button>
        <span class="span-completed">Completado: </span>
        <input type="checkbox" class="check-complete">
        `
        //Funcionalidad del boton de borrar tareas
        const btnBorrar = articleTarea.querySelector(".btn-del")
        btnBorrar.addEventListener("click", () => {
            articleTarea.remove()
            tareas = tareas.filter(tarea => tarea.id !== Number(articleTarea.dataset.idTarea))
            localStorage.setItem("tareas", JSON.stringify(tareas))
        })
        //Funcionalidad del checkbox para que se puedan marcar "completado" en las tareas
        const checkComplete = articleTarea.querySelector(".check-complete")
        checkComplete.addEventListener("click", () => {
            tarea.completado = true
            articleTarea.classList.add("tarea-completada")
            checkComplete.disabled = true
            localStorage.setItem("tareas", JSON.stringify(tareas))
            btnBorrar.disabled = false
        })

        //Se verifica si la tarea ya esta completada para pasarla a la seccion de "Completados"
        if (tarea.completado === true){
            checkComplete.checked = true
            articleTarea.classList.add("tarea-completada")
            checkComplete.disabled = true
            btnBorrar.disabled = false
        }

        SeccionTareas.appendChild(articleTarea)
    })

    localStorage.setItem("tareas", JSON.stringify(tareas))
}

const agregarTarea = () => {
    let nuevaTarea = {id: tareas.length + 1, titulo: titleTarea.value, descripcion: descTarea.value, hora: timeTarea.value, completado: false}
    tareas.push(nuevaTarea)
    crearTarea(tareas)
    localStorage.setItem("tareas", JSON.stringify(tareas))
    titleTarea.value = ""
    descTarea.value = ""
    timeTarea.value = ""        
    modalOculto.classList.add("oculto")
}

//Cuando se clickea el boton de agregar, se crea un nuevo objeto en el array en base a la informacion ingresada
btnAgregarTarea.addEventListener("click", () => {
    if(titleTarea.value == "" || descTarea.value == "" || timeTarea.value == ""){
        alert("¡Los campos de la tarea estan vacios!")
    }else{
        agregarTarea()
    }
})

btnAbrirModal.addEventListener("click", () => {
        modalOculto.classList.remove("oculto")
    })

btnCerrarModal.addEventListener("click", () => {
    modalOculto.classList.add("oculto")
    })

const seleccionarFiltro = (boton) => {
    btnTodos.classList.remove("seleccion-filtro")
    btnCompletados.classList.remove("seleccion-filtro")
    btnNoCompletados.classList.remove("seleccion-filtro")
    boton.classList.add("seleccion-filtro")
}

btnTodos.addEventListener("click", () => {
    crearTarea(tareas)
    seleccionarFiltro(btnTodos)
})

btnCompletados.addEventListener("click", () => {
    crearTarea(tareas.filter(t => t.completado === true))
    seleccionarFiltro(btnCompletados)
})

btnNoCompletados.addEventListener("click", () => {
    crearTarea(tareas.filter(t => t.completado === false))
    seleccionarFiltro(btnNoCompletados)
})

crearTarea(tareas)