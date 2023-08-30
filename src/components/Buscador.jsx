import React, { useState } from 'react';

function Buscador({ buscarColaboradores }) {
  const [filtro, setFiltro] = useState('');

  const buscarHandler = (e) => {
    const nuevoFiltro = e.target.value;
    setFiltro(nuevoFiltro);
    buscarColaboradores(nuevoFiltro);
  };

  return (
    <div>
      <input
        type="text"
        value={filtro}
        onChange={buscarHandler}
        placeholder="Buscar colaboradores"
      />
    </div>
  );
}

export default Buscador;
