async function imprimirStats() {
    console.log(eventos)

    // Obtenemos las categorias unicas
    var categorias = []

    var unique = eventos.map(evento => evento.category)
    const quitoRepetidas = new Set(unique)
    categorias = [...quitoRepetidas]

    console.log(categorias)

    //Agrupamos los eventos por categorias
    var porCategoria = []

    categorias.forEach(categoria => {
        porCategoria.push(
            {
                categoria: categoria,
                data: eventos.filter(evento => evento.category === categoria)
            }
        )
    })
    console.log(porCategoria)
    // Obtenemos datos de ingresos y asistencias o estimaciones por categoria

    var ingresoYassitencia = []

    porCategoria.map(datos => {
        ingresoYassitencia.push({
            categoria: datos.categoria,
            ingreso: datos.data.map(item => item.assistance ? item.assistance * item.price : 0),
            estimacionIngreso: datos.data.map(item => item.estimate ? item.estimate * item.price : 0),
            asistencia: datos.data.map(item => item.assistance ? item.assistance : 0),
            estimacionAsistencia: datos.data.map(item => item.estimate ? item.estimate : 0),
            capacidad: datos.data.map(item => item.capacity ? item.capacity : 0)
        })
    })
    //console.log(ingresoYassitencia)

    // Sumo los datos generados en arrays en el paso anterior
    ingresoYassitencia.forEach(categoria => {

        //Calculo capacidades y asistencias para poder obtener los porcentajes necesarios 

        let totalAsistencia = 0
        let totalAsistenciaEstimada = 0
        let totalCapacidadPasados = 0
        let totalCapacidadFuturos = 0

        for (var i = 0; i < categoria.ingreso.length; i++) {

            //POr la estructura de datos si posee ingreso es un ecento pasado y mediante esta verificacion obtengo datos de asistencia y capcidad
            if (categoria.ingreso[i] > 0) {
                totalCapacidadPasados += categoria.capacidad[i]
                totalAsistencia += categoria.asistencia[i]
                categoria.totalCapacidadPasados = totalCapacidadPasados
                categoria.totalAsistencia = totalAsistencia
                // si no posee ingresos posee estimaciones y se trata de eventos futuros y mediante esto obtengo datos de estimaciones 
            } else {
                totalCapacidadFuturos += categoria.capacidad[i]
                totalAsistenciaEstimada += categoria.estimacionAsistencia[i]
                categoria.totalCapacidadFuturos = totalCapacidadFuturos
                categoria.totalAsistenciaEstimada = totalAsistenciaEstimada
            }
        }
        categoria.porcentajeDeAsistencia = "%" + ((totalAsistencia * 100) / totalCapacidadPasados).toFixed(2)
        categoria.porcentajeDeEstimacion = "%" + ((totalAsistenciaEstimada * 100) / totalCapacidadFuturos).toFixed(2)

        //Calculo el total de ingresos (PASADOS)
        let totalIngreso = 0
        categoria.ingreso.map(ingresos => totalIngreso += ingresos)
        categoria.ingresos = totalIngreso

        //Calculo el total de estimacion de Ingresos (FUTUROS)
        let totalIngresoEstimado = 0
        categoria.estimacionIngreso.map(ingresosEstimados => totalIngresoEstimado += ingresosEstimados)
        categoria.estimacionIngresos = totalIngresoEstimado

    })

    console.log(ingresoYassitencia)
    //Separo los eventos pasados que son los que poseen asistencia
    let eventosPasados = []
    let eventosFuturos = []
    await eventos.filter(evento => {
        if (evento.assistance) {
            eventosPasados.push(evento)
        } else { eventosFuturos.push(evento) }
    })
    //le agregop a cada evento una propiedad calculando el porcentaje de asistencia en funcion de la capacidad del evento

    eventosPasados.map(evento => {
        evento.porcentajeAsistencia = evento.assistance * 100 / evento.capacity
    })

    let asistenciaEventos = []
    eventosPasados.filter(evento => { asistenciaEventos.push(evento.porcentajeAsistencia) })
    // //Busco el mayor valor y filtro por este el array de eventos
    let mayor = Math.max(...asistenciaEventos)
    let eventoMayorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === mayor)

    // Busco el menor valor y filtro por este el array de eventos pasados
    let menor = Math.min(...asistenciaEventos)
    let eventoMenorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === menor)

    // Busco el evento con mayor capacidad por ordenamiento descendente
    let mayorCapacidad = eventos.sort((a, b) => { return b.capacity - a.capacity })


    //GENERO DATOS EN TABLA DE EVENTOS CON MAYOR Y MENOR ASISTENCIA Y CAPACIDAD
    var rowMayoresYmenores = document.getElementById("mayoresymenores")
    rowMayoresYmenores.innerHTML = ""
    var tdMayorAsistencia = document.createElement("td")
    var tdMenorAsistencia = document.createElement("td")
    var tdMayorCapacidad = document.createElement("td")

    rowMayoresYmenores.append(tdMayorAsistencia)
    tdMayorAsistencia.append(eventoMayorAsistencia[0].name + " %" + eventoMayorAsistencia[0].porcentajeAsistencia.toFixed(2))

    rowMayoresYmenores.append(tdMenorAsistencia)
    tdMenorAsistencia.append(eventoMenorAsistencia[0].name + " %" + eventoMenorAsistencia[0].porcentajeAsistencia.toFixed(2))

    rowMayoresYmenores.append(tdMayorCapacidad)
    tdMayorCapacidad.append(mayorCapacidad[0].name + "(" + mayorCapacidad[0].category + ")")

    //GENERAR LOS DATOS DE CATEGIRIAS DE EVENTOS FUTUROS

    var tablaFuturos = document.getElementById("statsFuturos")

    ordenarFuturos = []
    ordenarFuturos.push(...ingresoYassitencia.sort((a, b) => {
        return b.estimacionIngresos - a.estimacionIngresos
    }))

    ordenarFuturos.map(evento => {
        if (evento.estimacionIngresos > 0) {
            tablaFuturos.innerHTML +=
                `
        <tr>
              <td>${evento.categoria}</td>
              <td>$${evento.estimacionIngresos}</td>
              <td>${evento.porcentajeDeEstimacion}</td>
            </tr>       
        `
        }
    })


    //GENERAR LOS DATOS DE CATEGIRIAS DE EVENTOS Pasados

    var tablaPasados = document.getElementById("statsPasados")

    let ordenarPasados = []
    ordenarPasados.push(...ingresoYassitencia.sort((a, b) => {
        return b.ingresos - a.ingresos
    }))

    ordenarPasados.map(evento => {
        if (evento.ingresos > 0) {
            tablaPasados.innerHTML +=
                `
     <tr>
           <td>${evento.categoria}</td>
           <td>$${evento.ingresos}</td>
           <td>${evento.porcentajeDeAsistencia}</td>
         </tr>       
     `
        }
    })

}