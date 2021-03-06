import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types"

const Formulario = ({guardarBusqueda, guardarPagina}) => {
  const [termino, guardarTermino] = useState("");
  const [error, guardarError] = useState(false);

  const buscarImagenes = (event) => {
    event.preventDefault();

    // Validar
    if (termino.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    // enviar el termino de búsqueda hacia el componente principal
    guardarBusqueda(termino)
    guardarPagina(1)
  };

  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o cafe"
            onChange={(event) => guardarTermino(event.target.value)}
            value={termino}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>

      {error && <Error mensaje="Agrega un Término de búsqueda" />}
    </form>
  );
};

Formulario.propTypes = {
  guardarBusqueda: PropTypes.func.isRequired,
  guardarPagina: PropTypes.func.isRequired
}

export default Formulario;
