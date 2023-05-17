let evento
var id = location.search.split("?id=").filter(Number)
var selectId = id[0]
const eventDetalles = []

var detalle = "";

async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    evento = datosApi.eventos
    detallecard()
}
getData()
//  var tipe = tipe = Assistance? "Assistencce" : "Estimate"

function detallecard() {
    for (var i = 0; i < evento.length; i++) {
        var asis_esti = evento[i].assistance ? "Assistance" : "Estimate"
        if (evento[i].id == selectId) {
            detalle += `
            <div class="main">
            <ul class="cards">
                <li class="cards_detalle">
                    <div class="cardDetalle">
                        <div class="card_image"><img src="${evento[i].image}"></div>
                        <div class="card_content">
                            <h2 class="card_title"> ${evento[i].category}</h2>
                            <p class="card_text"> ${evento[i].name}</p>
                            <p class="card_text"> ${evento[i].date} </p>
                            <p class="card_text"> ${evento[i].description}</p>
                            <p class="card_text"> ${evento[i].place} </p>
                            <p class="card_text"> Capacity: ${evento[i].capacity} </p>
                            <p class="card_text"> ${asis_esti}: ${evento[i].assistance || evento[i].estimate} </p>
                            <h6 class="card_text">Price: ${evento[i].price}</h6>
                        </div>
                    </div>
                </li>
            </ul>
        </div>`
            eventDetalles.push(evento[i])

        }
    }

    document.getElementById("detalle").innerHTML = detalle;
    console.log(document.getElementsByClassName("detalle"))
}