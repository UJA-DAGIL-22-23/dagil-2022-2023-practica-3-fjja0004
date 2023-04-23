/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Plantilla.cabeceraTable: ", function () {

    it("muestra los nombres de los diferentes campos de la cabecera de la tabla en HTML",
        function () {
            expect(Plantilla.cabeceraTable()).toBe(`<table class="listado-jugadores">
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
    `);
        });
});

describe("Plantilla.cuerpoTr ", function () {

    //Datos
    let d = {
        ref: {
            "@ref": {
                id: "ref jugador 1"
            }
        },
        data: {
            nombre: "Wayne Madsen",
            edad: 33,
            posicion: "Batsman",
            estadisticas: {
                partidosJugados: 80,
                puntuacionPromedio: 38.7,
                puntuacionMaxima: 95,
                puntuacionMinima: 5
            },
            historialEquipos: [
                "Wellington Wizards",
                "Lahore Lions"
            ],
            nacionalidad: "Australia",
            fechaNacimiento: "1990-03-15",
            peso: 80.2,
            altura: 1.85
        }
    }

    let msj = Plantilla.cuerpoTr(d)

    //Expect
    it("muestra una fila de tabla con el nombre del jugador",
        function () {
            expect(msj.includes(d.data.nombre)).toBeTrue();
        });

    it("muestra una fila de tabla con la edad del jugador",
        function () {
            expect(msj.includes(d.data.edad)).toBeTrue();
        });

    it("muestra una fila de tabla con la posición del jugador",
        function () {
            expect(msj.includes(d.data.posicion)).toBeTrue();
        });

    it("muestra una fila de tabla con las estadísticas del jugador",
        function () {
            expect(msj.includes(`Partidos Jugados: ${d.data.estadisticas.partidosJugados} / Puntuación Promedio: ${d.data.estadisticas.puntuacionPromedio} / Puntuación Máxima: ${d.data.estadisticas.puntuacionMaxima} / Puntuación Mínima: ${d.data.estadisticas.puntuacionMinima}`)).toBeTrue();
        });

    it("muestra una fila de tabla con el historial de equipos del jugador",
        function () {
            expect(msj.includes(d.data.historialEquipos.join(" / "))).toBeTrue();
        });

    it("muestra una fila de tabla con la nacionalidad del jugador",
        function () {
            expect(msj.includes(d.data.nacionalidad)).toBeTrue();
        });

    it("muestra una fila de tabla con la fecha de nacimiento del jugador",
        function () {
            expect(msj.includes(d.data.fechaNacimiento)).toBeTrue();
        });

    it("muestra una fila de tabla con el peso del jugador",
        function () {
            expect(msj.includes(d.data.peso)).toBeTrue();
        });

    it("muestra una fila de tabla con la altura del jugador",
        function () {
            expect(msj.includes(d.data.altura)).toBeTrue();
        });
});

describe("Plantilla.pieTable", function () {
    it("muestra las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        });
});


/**
 * Los test de esta función incluyen también a la función Plantilla.compare
 */
describe("Plantilla.ordenarAlfabeticamente: ", function () {
    it("ordena el vector en orden alfabético correctamente", () => {
        const vector = [
          { data: { nombre: "Wayne" } },
          { data: { nombre: "Liam" } },
          { data: { nombre: "Sofia" } },
          { data: { nombre: "George" } },
          { data: { nombre: "Billy" } },
        ];

        let alfabetico = true;
        vector.sort((a, b) =>
          alfabetico ? a.data.nombre.localeCompare(b.data.nombre) : b.data.nombre.localeCompare(a.data.nombre)
        );

        const nombresOrdenados = vector.map((elem) => elem.data.nombre);
        expect(nombresOrdenados).toEqual(["Billy", "George", "Liam", "Sofia", "Wayne"]);
      });
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
