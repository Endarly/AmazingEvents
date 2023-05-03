let fechaBase = dataAmazing.fechaActual
let eventos = dataAmazing.eventos
var eventosPasados = []
var eventosFuturos = []
var stats = ""
var contact = ""
let textoHTML = document.getElementById("form")
let ulNombreEventos = document.getElementById("eventos")
let arrayAFiltrar = []
var searchContainer = document.getElementById("searchContainer")
var inputSearch = document.getElementById("inputSearch")

let checkedCheckboxes = []
let search = ""


for (var i = 0; i < eventos.length; i++) {
    if (eventos[i].date > fechaBase) {
        eventosFuturos.push(eventos[i])
    } else {
        eventosPasados.push(eventos[i])
    }
}

//Permite navegar entre las opciones
var buttonNavegacion = []
var buttonNav = document.getElementsByClassName("navlink")
for (var i = 0; i < buttonNav.length; i++) {
    const element = buttonNav[i]
    buttonNavegacion.push(buttonNav[i].innerText)
    element.addEventListener("click", function (e) {
        //setState("paginaANavegar", e.target.id)
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
            // stats.style.display ="none"
            displayCards(eventosFuturos)
            eventsCategories(eventosFuturos)
            textoHTML.innerHTML = ""
            break;
        case "pastEvents":
            arrayAFiltrar = eventosPasados
            searchContainer.style.display = "flex"
            inputSearch.value = ""
            checkedCheckboxes = []
            displayCards(eventosPasados)
            eventsCategories(eventosPasados)
            break;
        case "contact":
            imprimirFormulario()
            ulNombreEventos.innerHTML = ""
            searchContainer.style.display = "none"
            break;
        case "stats":
            imprimirStats()
            texto = 'Estás en la página de Estadísticas'
            textoHTML.innerHTML = texto
            ulNombreEventos.innerHTML = ""
            searchContainer.style.display = "none"
            break;
        default:
            // setState("paginaANavegar", "home")
            //let InitAppStyle = document.getElementById("home")
            arrayAFiltrar = eventos
            searchContainer.style.display = "flex"
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
        <div class="card_image"><img src="Images/${array[i].image}"></div>
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

//     // document.getElementById("todosLosEventos").innerHTML = html;
// }

// //Detalle
// function detalle(id) {
//     document.getElementById("todosLosEventos").innerHTML =
//         `
// <h1></h1>
//  `
// }

//Toma el valor del location.search?TIME  Cuando me devuelvo del detalle
var time = location.search.split("?time=")

switch (time[1]) {
    case "pastEvents": imprimir("pastEvents")
        textoHTML.innerHTML = ""
        arrayAFiltrar = eventosPasados
        inputSearch.value = ""
        checkedCheckboxes = []
        searchContainer.style.display = "flex"
        changePage(2)
        break;
    case "upcomingEvents": imprimir("upcomingEvents")
        arrayAFiltrar = eventosFuturos
        inputSearch.value = ""
        checkedCheckboxes = []
        searchContainer.style.display = "flex"
        changePage(1)
        break;
    case "contact": imprimir("contact")
        imprimirFormulario()
        textoHTML.innerHTML = ""
        searchContainer.style.display = "none"
        changePage(3)
        break;
    case "stats": imprimir("stats")
        textoHTML.innerHTML = ""
        searchContainer.style.display = "none"
        changePage(4)
        break;
    default: imprimir("home")
        changePage(0)
}

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
        case 0: displayCards(eventos)
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            textoHTML.innerHTML = ""
            arrayAFiltrar = eventosPasados
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"
            break;
        case 1: displayCards(eventosFuturos)
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            arrayAFiltrar = eventosFuturos
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"
            break;
        case 2: displayCards(eventosPasados)
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            textoHTML.innerHTML = ""
            arrayAFiltrar = eventosPasados
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"
            break;
        case 3: imprimirFormulario("contact")
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            textoHTML.innerHTML = ""
            searchContainer.style.display = "none"
            break;
        case 4: imprimirStats("stats")
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            textoHTML.innerHTML = ""
            searchContainer.style.display = "none"
            break;
    }
}

function imprimirFormulario() {
    document.getElementById("todosLosEventos").innerHTML =
        `
        <div class="form">
            <form method="POST" action="">
              <div class="input-field">
                <i class="fas fa-user"></i>
                <label for="nombre">Name</label>
                <input class="inputform" type="text" name="nombre" maxlength="50" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]{3,23}" title="Debe indicar su nombre correctamente" required>
              </div>

              <div class="input-field">
                <i class="fas fa-mobile-alt"></i>
                <label for="telefono">Cell Phone</label>
                <input class="inputform" type="telf" name="telefono" maxlength="9" pattern="^[6789]\d{8}$" title="Debe indicar un telefono válido" required>
              </div>

              <div class="input-field">
                <i class="fas fa-at"></i>
                <label for="email">Email</label>
                <input class="inputform" type="email" name="email" maxlength="100" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" title="Debe indicar un correo válido" required>
              </div>

              <div class="input-field">
                <i class="fas fa-pen"></i>
                <label for="mensaje">Mesagge</label>
                <textarea name="mensaje" rows="10" length="140" required></textarea>
              </div>

              <div class="btn-block">
                <button class="btn" type="submit"><i class="fas fa-paper-plane"></i>Submit</button>
              </div>

            </form>
          </div>

    `}

function imprimirStats() {
    document.getElementById("todosLosEventos").innerHTML =
         `
         <h1></h1>
      `
}

inputSearch.addEventListener("keyup", function (evento) {
    var datoInput = evento.target.value
    console.log('DATOINPUT==> ', datoInput)
    search = datoInput.trim().toLowerCase()
    console.log('SEARCXH==> ', datoInput)
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
        ulNombreEventos.innerHTML = `<h1 class="ceroResult" >No se encontraron eventos para tu búsqueda </h1>`
}
