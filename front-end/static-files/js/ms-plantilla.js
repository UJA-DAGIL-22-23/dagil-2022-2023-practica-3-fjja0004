/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    nombre: "",
    nacionalidad: "",
    fechaNacimiento: "",
    peso: "",
    altura: ""
}


/**
 * Función principal para recuperar los nombres de los jugadores desde el MS y, posteriormente, imprimirlos.
 */
Plantilla.procesarNombres = function () {
    this.recupera(this.imprimeNombres);
}

/**
 * Función principal para recuperar los jugadores desde el MS y, posteriormente, imprimirlos.
 */
Plantilla.procesarListar = function () {
    this.recupera(this.imprimeJugadores);
}

/**
 * Función que recupera todos los jugadores llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio jugadores
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodosJugadores"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los jugadores que se han descargado
    let vectorjugadores = null
    if (response) {
        vectorjugadores = await response.json()
        callBackFn(vectorjugadores.data)
    }
}

/**
 * Función para mostrar en pantalla todos los nombres de los jugadores que se han recuperado de la BBDD.
 * @param {vector_de_jugadores} vector Vector con los nombres de los jugadores a mostrar
 */

Plantilla.imprimeNombres = function (vector) {

    let msj = "";
    msj += Plantilla.cabeceraTableNombres();
    vector.forEach(e => msj += Plantilla.cuerpoTrNombres(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de nombres", msj)
}

/**
 * Función para mostrar en pantalla todos los jugadores que se han recuperado de la BBDD.
 * @param {vector_de_jugadores} vector Vector con los datos de los jugadores a mostrar
 */

Plantilla.imprimeJugadores = function (vector) {

    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de jugadores", msj)
}

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTableNombres = function () {
    return `<table class="listado-jugadores">
        <thead>
                <th>Nombre</th>
        </thead>
        <tbody>
        <a href="javascript:Plantilla.listarAlf()" 
            class="opcion-principal mostrar
                "title="Listar todos los nombres de los jugadores orden alfabético">Ordenar alfabéticamente</a>
    `;
}

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTable = function () {
    return `<table class="listado-jugadores">
        <thead>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Posición</th>
            <th>Estadísticas</th>
            <th>Historial de equipos</th>
            <th>Nacionalidad</th>
            <th>Fecha de nacimiento</th>
            <th>Peso</th>
            <th>Altura</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra el nombre de cada jugador en un elemento TR con sus correspondientes TD
 * @param {jugador} a Nombre del jugador a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el jugador.
 */
Plantilla.cuerpoTrNombres = function (a) {
    const d = a.data

    return `<tr title="${a.ref['@ref'].id}">
            <td><em>${d.nombre}</em></td>
            </tr>`;
}

/**
 * Compara dos nombres dados para saber cuál va primero alfabéticamente
 * @param {*} a Primer nombre
 * @param {*} b Segundo nombre
 * @returns -1 si a es "menor" que b, 1 si a es "mayor" que b, 0 si los nombres son iguales
 */
Plantilla.compare = function(a, b) {
    var nombreA = a.data.nombre.toUpperCase(); // convertir nombre a mayúsculas para comparar
    var nombreB = b.data.nombre.toUpperCase(); // convertir nombre a mayúsculas para comparar
    if (nombreA < nombreB) {
        return -1;
    }
    if (nombreA > nombreB) {
        return 1;
    }
    // si los nombres son iguales, no se cambia el orden
    return 0;
};

Plantilla.ordenarAlfabeticamente = function (vector) {
    vector.sort(Plantilla.compare);
    Plantilla.imprimeNombres(vector);
}

Plantilla.listarAlf = function () {
    const a = Plantilla.recupera(Plantilla.ordenarAlfabeticamente);
}


/**
 * Muestra la información de cada jugador en un elemento TR con sus correspondientes TD
 * @param {jugador} a Datos del jugador a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el jugador.
 */
Plantilla.cuerpoTr = function (a) {
    const d = a.data

    return `<tr title="${a.ref['@ref'].id}">
            <td><em>${d.nombre}</em></td>
            <td>${d.edad}</td>
            <td>${d.posicion}</td>
            <td>Partidos Jugados: ${d.estadisticas.partidosJugados} / Puntuación Promedio: ${d.estadisticas.puntuacionPromedio} / Puntuación Máxima: ${d.estadisticas.puntuacionMaxima} / Puntuación Mínima: ${d.estadisticas.puntuacionMinima}</td>
            <td>${d.historialEquipos.join(" / ")}</td>
            <td>${d.nacionalidad}</td>
            <td>${d.fechaNacimiento}</td>
            <td>${d.peso}</td>
            <td>${d.altura}</td>
            </tr>`;
}

/**
 * Pie de la tabla en la que se muestran los jugadores
 * @returns Cadena con el pie de la tabla
 */
Plantilla.pieTable = function () {
    return "</tbody></table>";
}

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}
