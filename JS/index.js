let fechaBase
let eventos
var eventosPasados = []
var eventosFuturos = []
let formulario = document.getElementById("form")
let ulNombreEventos = document.getElementById("eventos")
let modalComentario = document.getElementById("modalComentario")
let stats = document.getElementById("stats")
let arrayAFiltrar = []
var searchContainer = document.getElementById("searchContainer")
var inputSearch = document.getElementById("inputSearch")
let checkedCheckboxes = []
let search = ""
var buttonNavegacion = []


async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    fechaBase = datosApi.fechaActual

    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].date > fechaBase) {
            eventosFuturos.push(eventos[i])
        } else {
            eventosPasados.push(eventos[i])
        }
    }

    //Toma el valor del location.search?TIME  Cuando me devuelvo del detalle
    var time = location.search.split("?time=")
    console.log('1ero de todo VAR========>', time[1])
    switch (time[1]) {
        case "pastEvents":
            changePage(2)
            break;
        case "upcomingEvents":
            changePage(1)
            break;
        case "contact":
            changePage(3)
            break;
        case "estadistica":
            changePage(4)
            break;
        default:
            changePage(0)
    }
}

getData()

//Permite navegar entre las opciones
var buttonNav = document.getElementsByClassName("navlink")
for (var i = 0; i < buttonNav.length; i++) {
    const element = buttonNav[i]
    buttonNavegacion.push(buttonNav[i].innerText)
    element.addEventListener("click", function (e) {
        setState("paginaANavegar", e.target.id)
        document.getElementById("name").innerHTML = e.target.innerText
        imprimir(e.target.id);
    })
}

function imprimir(id) {
    switch (id) {
        case "upcomingEvents":
            arrayAFiltrar = eventosFuturos
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"
            ulNombreEventos.style.display = "flex"
            displayCards(eventosFuturos)
            eventsCategories(eventosFuturos)
            formulario.style.display = "none"
            stats.style.display = "none"
            break;
        case "pastEvents":
            arrayAFiltrar = eventosPasados
            searchContainer.style.display = "flex"
            ulNombreEventos.style.display = "flex"
            inputSearch.value = ""
            checkedCheckboxes = []
            displayCards(eventosPasados)
            eventsCategories(eventosPasados)
            formulario.style.display = "none"
            stats.style.display = "none"
            break;
        case "contact":
            imprimirFormulario()
            ulNombreEventos.style.display = "none"
            searchContainer.style.display = "none"
            formulario.style.display = "flex"
            stats.style.display = "none"
            break;
        case "estadistica":
            imprimirStats()
            document.getElementById("todosLosEventos").innerHTML = ""
            ulNombreEventos.style.display = "none"
            searchContainer.style.display = "none"
            formulario.style.display = "none"
            stats.style.display = "flex"
            break;
        default:
            setState("paginaANavegar","home")
            ulNombreEventos.style.display = "flex"
            inputSearch.value = ""
            checkedCheckboxes = []
            arrayAFiltrar = eventos
            searchContainer.style.display = "flex"
            formulario.style.display = "none"
            stats.style.display = "none"
            console.log('PREVIO AL PASO 4to paso ===> ', eventos)
            displayCards(eventos)
            eventsCategories(eventos)
            break;
    }
}

//me imprime todas las tarjetas dependiendo de donde esté ubicado
function displayCards(array) {
    var url
    if (location.pathname == "/pages/detalle.html") {
        url = "../detalle.html"
    } else {
        url = "../pages/detalle.html"
    }
    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `
        <li class="cards_item">
      <div class="card">
        <img src="${array[i].image}" alt="${array[i].name}">
        <div class="card_content">
          <p class="card_title">${array[i].name}</p>
          <h6 class="card_text"> Price: ${array[i].price}</h6>
          <a href="${url}?id=${array[i].id}"><button class="btn card_btn">Read More</button></a>
        </div>
      </div>
    </li>
    `
        var text = `Este es el id => ${array[i].id}`
        console.log(text)
    }

    document.getElementById("todosLosEventos").innerHTML = html;
}

//Carrusel
var buttonafter = document.getElementById("next")
buttonafter.addEventListener("click", function (e) {
    var page = document.getElementById("name").innerText
    if (buttonNavegacion.indexOf(page) == 4) {
        changePage(0)
    } else {
        changePage(buttonNavegacion.indexOf(page) + 1)
    }

})

var buttonafter = document.getElementById("after")
buttonafter.addEventListener("click", function (e) {
    var page = document.getElementById("name").innerText
    if (buttonNavegacion.indexOf(page) == 0) {
        changePage(4)
    } else {
        changePage(buttonNavegacion.indexOf(page) - 1)
    }
})


//CARRUSEL
function changePage(i) {
    switch (i) {
        case 1:
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            imprimir("upcomingEvents")
            break;
        case 2:
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            imprimir("pastEvents")
            break;
        case 3:
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            imprimir("contact")
            break;
        case 4:
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            imprimir("estadistica")
            break;
        default:
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            imprimir("home")
    }
}

function imprimirFormulario() {
    document.getElementById("todosLosEventos").innerHTML =
        `<div class="card_contact">
        <form action="">
        <div class="login-box">
        <div class="form_input">
            <label for="email"><i class="fa-solid fa-user"></i></label>
            <input type="email" name="email" placeholder="email@email.com" required>
        </div>
        <div class="form_input">
            <label for="type"><i class="fa-solid fa-qrcode"></i></label>
            <select id="type" name="type" >
                <option value="Varios" selected>Varios</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Sugerencia">Sugerencia</option>
                <option value="Felicitaciones">Felicitaciones</option>
            </select>
        </div>
        <div class="form_input">
            <label for="date"><i class="fa-solid fa-calendar"></i></i></label>
            <input type="date"id="date">
        </div>
        <div class="form_input">
            <label for="comentario"><i class="fa-solid fa-comment"></i></label>
            <textarea id="comentario" placeholder="Dejanos tu comentario"></textarea>
        </div>

        <div class="btn-block">
        <button class="btn" type="submit"><i class="fas fa-paper-plane"></i>Submit</button>

      </div>
    </form>
    </div>

    `
    let form = document.querySelector("form")
    form.addEventListener("submit", function (event) { actionForm(event) })
}

inputSearch.addEventListener("keyup", function (evento) {
    var datoInput = evento.target.value
    search = datoInput.trim().toLowerCase()
    filtrosCombinados()
})

//Creación dinámica de los checbox
function eventsCategories(array) {
    let categories = array.map(evento => evento.category)
    let unica = new Set(categories)
    let lastCategories = [...unica]
    let categoriasEventos = ""
    lastCategories.map(category =>
        categoriasEventos +=
        `
    <label><input type="checkbox" value="${category}"> ${category}</label>
    `
    )
    document.getElementById("checkcategories").innerHTML = categoriasEventos
    checkboxListener()
}

function checkboxListener() {
    var checkboxs = document.querySelectorAll('input[type=checkbox')
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {
            checkedCheckboxes = []
            for (i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            console.log(checkedCheckboxes)
            filtrosCombinados()
        })
    }
}

function filtrosCombinados() {
    var filtrado = []
    if (search !== "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category => filtrado.push(...arrayAFiltrar.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category)
        ))
    }
    else if (search !== "" && checkedCheckboxes.length == 0) {
        filtrado = arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(search))
    }
    else if (search === "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category =>
            filtrado.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )
    }
    else {
        filtrado = arrayAFiltrar
    }
    filtrado.length > 0 ?
        displayCards(filtrado) :
        document.getElementById("todosLosEventos").innerHTML=""
        ulNombreEventos.innerHTML = `<h1 class="ceroResult" >No se encontraron eventos para tu búsqueda </h1>`
}
