import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario"
import ListadoImagenes from "./components/ListadoImagenes"

function App() {

  const [busqueda, guardarBusqueda] = useState("")
  const [imagenes, guardarImagenes] = useState([])
  const [pagina, guardarPagina] = useState(1)
  const [totalPaginas, guardarTotalPaginas] = useState(1)

  useEffect(() => {
    if (busqueda === "") return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = "21713623-1335b4780fdffc2b715a6a399";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${pagina}`;

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)

      // Calcular el total de paginas
      guardarTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina));

      // mover la pantalla hacia arriba
      const jumbotron = document.querySelector(".jumbotron")
      jumbotron.scrollIntoView({ behavior: "smooth"})
    }

    consultarAPI()

  }, [busqueda, pagina])

  // Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = pagina - 1;
    
    if (nuevaPaginaActual === 0) return
    
    guardarPagina(nuevaPaginaActual)
  }
  
  // Definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = pagina + 1;

    if (nuevaPaginaActual > totalPaginas) return

    guardarPagina(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
          guardarPagina={guardarPagina}
        />
      </div>

      <div className="row justify-content-center mb-5">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        { pagina !== 1 && 
          <button
            type="button"
            name="prev"
            className="btn-info ml-1 mr-1"
            onClick={paginaAnterior}
            >
          &laquo; Anterior 
          </button>
        }

        { pagina !== totalPaginas &&
          <button
            type="button"
            name="next"
            className="btn-info ml-1 mr-1"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        }
      </div>
    </div>
  );
}

export default App;
